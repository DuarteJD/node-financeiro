import { getRepository } from "typeorm";
import { Categorias } from "../entity/Categorias";
import TratamentoErros  from "../erros/TratamentoErros";

interface Request {
  nome?: string;
  is_ativo?: boolean;
  tipo: 'C' | 'D' | 'T';
}

class CategoriasServiceAtualizar {
  public async execute(id: string, data: Request): Promise<Categorias> {

    const repository = getRepository(Categorias)

    const encontrarID = await repository.findOneOrFail(id)

    if(!encontrarID) {
      throw new TratamentoErros('Categoria não encontrada!', 404)
    }

    if(data.nome){
      const encontrarNome = await repository.findOne({ where: { nome: data.nome }} )
      if(encontrarNome) {
        if(encontrarNome.id !== id){
          throw new TratamentoErros('Este nome de categoria já encontra-se em uso!', 422)
        }
      }
    }

    const linha = await repository.update(id, data)

    if(!linha.affected) {
      throw new TratamentoErros('Nenhum registro foi alterado!', 400)
    }

    const registro = await repository.findOneOrFail(id)

    return registro

  }
}
export default CategoriasServiceAtualizar;
