import { getRepository } from "typeorm";
import { Categorias } from '../entity/Categorias'

import TratamentoDeErros  from "../erros/TratamentoErros";

interface Request {
  nome: string;
  is_ativo?: boolean;
  tipo: 'C' | 'D' | 'T';
}

class CategoriasServiceCriar {
  public async execute(data: Request): Promise<Categorias> {

    const repository = getRepository(Categorias)

    const encontrarNome = await repository.findOne({ where: { nome : data.nome, is_ativo : true }})

    if(encontrarNome) {
      throw new TratamentoDeErros('Esta categoria encontra-se cadastrada!', 422)
    }

    const registro = repository.create(data);

    await repository.save(registro)

    return registro

  }
}
export default CategoriasServiceCriar;
