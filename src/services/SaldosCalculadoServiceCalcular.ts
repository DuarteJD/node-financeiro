import { getRepository, MoreThanOrEqual } from "typeorm";
import { SaldosCalculado } from '../entity/SaldosCalculado'
import { Movimentos } from '../entity/Movimentos';

import TratamentoDeErros  from "../erros/TratamentoErros";

interface Request {
  data: Date;
  conta_id: string;
}

class SaldosCalculadoServiceCalcular {
  public async execute({data, conta_id}: Request): Promise<void> {

    const repository = getRepository(SaldosCalculado)
    const repositoryMovimentos = getRepository(Movimentos)

    //Deletar todo o recalculo para frente desta data
    const registros = await repository.find({
      where : {
        data : MoreThanOrEqual(data),
        conta_id : conta_id
      }
    });
    await repository.remove(registros);

    //Agora vamos selecionar todos os registros da tabela movimento ordenados por data
    const sql = repositoryMovimentos.createQueryBuilder('movimentos')
        .where(`data >= ${data} and conta_id = ${conta_id}`)
        .orWhere(`data >= ${data} and transferencia_conta_id = ${conta_id}`)
        .groupBy('movimentos.data, movimentos.conta_id')
        .orderBy('movimentos.data ASC')
        .getSql();

    throw new TratamentoDeErros(sql, 422)

  }
}
export default SaldosCalculadoServiceCalcular;
