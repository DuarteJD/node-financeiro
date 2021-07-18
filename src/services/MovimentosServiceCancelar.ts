import { getRepository } from "typeorm";

import { Movimentos } from '../entity/Movimentos';
import TratamentoErros  from "../erros/TratamentoErros";

import SaldosCalculadoServiceCalcular from "../services/SaldosCalculadoServiceCalcular";

interface Response {
  id: string;
}

class MovimentosServiceCancelar {
  public async execute({ id }: Response) : Promise<void> {

    const repository = getRepository(Movimentos)

    const registro = await repository.findOne(id)

    if(!registro) {
      throw new TratamentoErros('Registro não encontrado!', 404)
    }

    const linha = await repository.update(id, {
      is_ativo : !registro.is_ativo
    })

    if(!linha.affected) {
      throw new TratamentoErros('Nenhum registro foi alterado!', 400)
    }

    const service = new SaldosCalculadoServiceCalcular()

    await service.execute(registro.conta_id)

  }
}

export default MovimentosServiceCancelar;
