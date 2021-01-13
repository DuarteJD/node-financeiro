import { getRepository } from "typeorm";

import { Categorias } from '../entity/Categorias';
import TratamentoErros  from "../erros/TratamentoErros";

interface Response {
  id: string;
}

class CategoriasServiceCancelar {
  public async execute({ id }: Response) : Promise<void> {

    const repository = getRepository(Categorias)

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
  }
}

export default CategoriasServiceCancelar;
