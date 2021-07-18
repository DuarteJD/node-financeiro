import { getRepository } from "typeorm";
import { Contas } from '../entity/Contas'

import TratamentoDeErros  from "../erros/TratamentoErros";

interface Request {
  nome: string;
  saldo_inicial: number;
  data_saldo?: Date;
  melhor_dia_compra?: number;
  is_ativo?: boolean;
  is_cartao?: boolean;
}

class ContasServiceCriar {
  public async execute(data: Request): Promise<Contas> {

    const repository = getRepository(Contas)

    const encontrarNome = await repository.findOne({ where: { nome : data.nome, is_ativo : true }})

    if(encontrarNome) {
      throw new TratamentoDeErros('Esta conta já encontra-se cadastrada!', 422)
    }

    const registro = repository.create(data);

    await repository.save(registro)

    return registro

  }
}
export default ContasServiceCriar;
