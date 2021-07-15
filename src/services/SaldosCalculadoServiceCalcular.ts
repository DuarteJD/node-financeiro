import { getRepository } from "typeorm";
import { SaldosCalculado } from '../entity/SaldosCalculado'

import TratamentoDeErros  from "../erros/TratamentoErros";

interface Request {
  data: Date;
  conta_id: number;
}

class SaldosCalculadoServiceCalcular {
  public async execute({data, conta_id}: Request): Promise<void> {

    const repository = getRepository(SaldosCalculado)

    //Deletar todo o recalculo para frente desta data
    const registros = await repository.find({ where : { data >= data }})

    }
  }
}
export default SaldosCalculadoServiceCalcular;
