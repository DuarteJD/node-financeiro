import { getRepository } from "typeorm";
import { Contas } from "../entity/Contas";
import TratamentoErros  from "../erros/TratamentoErros";

interface Request {
  nome: string;
  saldo_inicial: number;
  data_saldo?: Date;
  melhor_dia_compra?: number;
  is_ativo?: boolean;
  is_cartao?: boolean;
}

class ContasServiceAtualizar {
  public async execute(id: string, data: Request): Promise<Contas> {

    const repository = getRepository(Contas)

    const encontrarID = await repository.findOneOrFail(id)

    if(!encontrarID) {
      throw new TratamentoErros('Conta não encontrada!', 404)
    }

    if(data.nome){
      const encontrarNome = await repository.findOne({ where: { nome: data.nome }} )
      if(encontrarNome) {
        if(encontrarNome.id !== id){
          throw new TratamentoErros('O nome utilizado já encontra-se cadastrado!', 422)
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
export default ContasServiceAtualizar;
