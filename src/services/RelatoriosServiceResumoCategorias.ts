import { getRepository } from "typeorm";
import { Categorias } from '../entity/Categorias'

import TratamentoDeErros  from "../erros/TratamentoErros";

interface Relatorio {
  nome: string;
  valor: number;
}


class RelatoriosServiceResumoContas {
  public async execute(data_inicial: string, data_final : string): Promise<Relatorio[]> {

    const Relatorios : Relatorio[] = [];
    const repositoryCategorias = getRepository(Categorias)

    console.log(`Data inicial ${data_inicial}`)
    console.log(`Data final ${data_final}`)

    const resultado : any = await repositoryCategorias.createQueryBuilder('categorias')
      .select(`nome, SUM(case when movimentos.tipo = 'C' then movimentos.valor else 0 end) as "credito", SUM(case when movimentos.tipo = 'D' then movimentos.valor else 0 end) as "debito"`)
      .leftJoin("movimentos","movimentos", "movimentos.categoria_id = categorias.id")
      .groupBy("date(data), categorias.id")
      .getRawMany();

    Relatorios.push(resultado.map(elemento => {
      return {
        nome: elemento.nome,
        valor: Number(elemento.credito) + Number(elemento.debito)
      }
    }))

    return Relatorios;
  }
}
export default RelatoriosServiceResumoContas;
