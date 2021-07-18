import { getRepository, MoreThanOrEqual, getManager } from "typeorm";
import { SaldosCalculado } from '../entity/SaldosCalculado'
import { Movimentos } from '../entity/Movimentos';
import { Contas } from '../entity/Contas';

import TratamentoErros  from "../erros/TratamentoErros";

class SaldosCalculadoServiceCalcular {
  public async execute( conta_id : string): Promise<void> {

    //Instanciando os repositórios que serão utilizados
    const repository = getRepository(SaldosCalculado)
    const repositoryMovimentos = getRepository(Movimentos)
    const repositoryContas = getRepository(Contas)

    //Vou buscar a conta corrente para o saldo inicial e data inicial de recalculo
    const contaParaRecalculo = await repositoryContas.findOneOrFail(conta_id)

    if(!contaParaRecalculo) {
      throw new TratamentoErros('Conta não encontrada!', 404)
    }

    const data_inicial = contaParaRecalculo.data_saldo;

    //Deletar todo o recalculo para frente desta data
    const registros = await repository.find({
      where : {
        data : MoreThanOrEqual(data_inicial),
        conta_id : conta_id
      }
    });
    await repository.remove(registros);

    //Agora vamos selecionar todos os registros da tabela movimento ordenados por data e conta
    //Verificar no futuro uma forma de inferir o tipo no retorno*
    const movimentos : any = await repositoryMovimentos.createQueryBuilder('movimentos')
      .select(`conta_id, date(data), SUM(case when tipo = 'C' then valor else 0 end) as "credito", SUM(case when tipo = 'D' then valor else 0 end) as "debito"`)
      .where(`data >= '${data_inicial}' and conta_id = '${conta_id}'`)
      .groupBy('date(data), conta_id')
      .orderBy('date(data)')
      .getRawMany();

    //Agora vamos efetuar o calculo do saldo
    let saldo = Number(contaParaRecalculo.saldo_inicial);
    const promises = movimentos.map(async(movimento) => {
      saldo += Number(movimento.credito)
      saldo -= Number(movimento.debito)
      await repository.save({
        conta_id : movimento.conta_id,
        data : movimento.date,
        saldo
      });
    });

    //Executando a promise acima salvando o registro no banco
    await Promise.all(promises);

  }
}
export default SaldosCalculadoServiceCalcular;
