import { getRepository } from "typeorm";
import { Movimentos } from '../entity/Movimentos'


interface Request {
  data: Date;
  conta_id: number;
  categoria_id: number;
  tipo: 'C' | 'D';
  is_pago: boolean;
  quantidade_parcelas: number;
  descricao: string;
  valor: number;
  is_ativo: boolean;
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
