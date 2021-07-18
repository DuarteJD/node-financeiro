import { getRepository, LessThanOrEqual, MoreThanOrEqual, Between } from "typeorm";
import { Movimentos } from "../entity/Movimentos";
import { SaldosCalculado } from '../entity/SaldosCalculado'

interface Relatorio {
  nome: string;
  tipo: string;
  valor: number;
}

class RelatoriosServiceDetalhesContas {
  public async execute(conta: string): Promise<Relatorio[]> {

    const repository = getRepository(Movimentos)
    const repositorySaldo = getRepository(SaldosCalculado)

    const data = new Date().toISOString().slice(0, 10);

    var date = new Date();
    var primeiroDiaMes = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10);
    var ultimaHoraHoje = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 59).toISOString().slice(0, 19);

    const registroSaldo = await repositorySaldo.createQueryBuilder()
    .where(`data < '${primeiroDiaMes}' and conta_id = '${conta}'`)
    .orderBy('data', 'DESC')
    .limit(1)
    .getOne();

    const Relatorios : Relatorio[] = [];

    Relatorios.push({
      nome : 'Saldo inicial',
      tipo: 'C',
      valor: registroSaldo ? Number(registroSaldo.saldo) : 0.00
    })

    const registros = await repository.find({
      data: Between(primeiroDiaMes, ultimaHoraHoje),
      conta_id: conta,
      is_ativo: true
    })

    let saldo_total = registroSaldo ? Number(registroSaldo.saldo) : 0.00;
    registros.forEach(element => {

      switch (element.tipo) {
        case 'C':
          saldo_total+= Number(element.valor)
          break;

        case 'D':
          saldo_total-= Number(element.valor)
          break;
      }

      Relatorios.push({
        nome: element.descricao,
        tipo: element.tipo,
        valor: element.valor
      })
    });

    Relatorios.push({
      nome : 'Saldo final',
      tipo: 'C',
      valor: saldo_total
    })

    return Relatorios;
  }
}
export default RelatoriosServiceDetalhesContas;
