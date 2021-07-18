import { getRepository } from "typeorm";
import { Movimentos } from '../entity/Movimentos'

interface Request {
  data: Date;
  conta_id: string;
  categoria_id?: string;
  recorrente_id?: string;
  transferencia_conta_id?: string;
  tipo: 'C' | 'D' | 'T';
  descricao: string;
  valor: number;
  is_ativo: boolean;
  is_recorrente?: boolean;
}

class MovimentosServiceCriar {
  public async execute(data: Request): Promise<Movimentos> {

    const repository = getRepository(Movimentos)

    const registro = repository.create(data);

    await repository.save(registro)

    return registro
  }
}
export default MovimentosServiceCriar;
