import { getRepository } from "typeorm";
import { SaldosCalculado } from '../entity/SaldosCalculado'

import TratamentoDeErros  from "../erros/TratamentoErros";

interface Request {
  data: Date;
  conta_id: string;
  saldo: number;
}

class SaldosCalculadoServiceCriar {
  public async execute({data, conta_id, saldo}: Request): Promise<SaldosCalculado> {

    const repository = getRepository(SaldosCalculado)

    const encontrar = await repository.findOne({ where: { conta_id , data }})

    if(encontrar) {
      const linha = await repository.update(encontrar.id, {data, conta_id, saldo})

      if(!linha.affected) {
        throw new TratamentoDeErros('Nenhum registro foi alterado!', 400)
      }

      const registro = await repository.findOneOrFail(encontrar.id)

      return registro

    } else {

      const registro = repository.create({
        conta_id,
        data,
        saldo,
      });

      await repository.save(registro)

      return registro
    }
  }
}
export default SaldosCalculadoServiceCriar;
