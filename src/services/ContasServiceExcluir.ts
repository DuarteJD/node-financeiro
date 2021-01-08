import { getRepository } from "typeorm";

import { Contas } from '../entity/Contas';
import TratamentoErros  from "../erros/TratamentoErros";

interface Response {
  id: string;
}

class ContasServiceExcluir {
  public async execute({ id }: Response) : Promise<void> {

    const repository = getRepository(Contas)

    const registro = await repository.findOne(id)

    if(!registro) {
      throw new TratamentoErros('Registro não encontrado!', 404)
    }

    const linha = await repository.update(id, {
      is_ativo:false
    })

    if(!linha.affected) {
      throw new TratamentoErros('Nenhum registro foi alterado!', 400)
    }
  }
}

export default ContasServiceExcluir;
