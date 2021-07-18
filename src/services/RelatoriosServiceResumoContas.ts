import { getRepository, LessThanOrEqual } from "typeorm";
import { Contas } from "../entity/Contas";
import { SaldosCalculado } from '../entity/SaldosCalculado'

interface Relatorio {
  nome: string;
  valor: number;
}

class RelatoriosServiceResumoContas {
  public async execute(data: string): Promise<Relatorio[]> {

    const repository = getRepository(Contas)
    const repositorySaldo = getRepository(SaldosCalculado)

    const contas = await repository.find({
      where : {
        is_ativo : true
      }
    });

    const Relatorios : Relatorio[] = [];

    //Já vou aproveitar as promises para calcular o valor total.
    let saldo_total = 0.00;

    const promises = contas.map(async(conta) => {
      //Aqui iremos pegar o saldo atual de cada conta.
      const registro = await repositorySaldo.createQueryBuilder()
        .where(`data <= '${data}' and conta_id = '${conta.id}'`)
        .orderBy('data', 'DESC')
        .limit(1)
        .getOne();

      //Montando o objeto para esta conta
      const relatorio : Relatorio = {
        nome: conta.nome,
        valor: registro ? Number(registro.saldo) : 0.00,
      }
      saldo_total += Number(relatorio.valor);

      //Adicionando o resultado no Array final de retorno
      Relatorios.push(relatorio)
    });

    //Executando a promise acima salvando o registro no banco
    await Promise.all(promises);

    //Adicionando o totalizador final de todas as contas
    Relatorios.push({
      nome: 'Saldo total',
      valor: saldo_total
    })

    return Relatorios;
  }
}
export default RelatoriosServiceResumoContas;
