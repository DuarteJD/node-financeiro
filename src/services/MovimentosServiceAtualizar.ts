import { getRepository } from "typeorm";
import { Movimentos } from "../entity/Movimentos";
import TratamentoErros  from "../erros/TratamentoErros";

interface Request {
  data?: Date;
  conta_id?: number;
  categoria_id?: number;
  tipo?: 'C' | 'D';
  is_pago?: boolean;
  quantidade_parcelas?: number;
  descricao?: string;
  valor?: number;
  is_ativo?: boolean;
}

class MovimentosServiceAtualizar {
  public async execute(id: string, data: Request): Promise<Movimentos> {

    const repository = getRepository(Movimentos)

    const encontrarID = await repository.findOneOrFail(id)

    if(!encontrarID) {
      throw new TratamentoErros('Registro não encontrado!', 404)
    }

    const linha = await repository.update(id, data)

    if(!linha.affected) {
      throw new TratamentoErros('Nenhum registro foi alterado!', 400)
    }

    const registro = await repository.findOneOrFail(id)

    return registro

  }
}
export default MovimentosServiceAtualizar;
