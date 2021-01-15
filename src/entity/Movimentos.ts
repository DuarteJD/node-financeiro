import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('movimentos')
export class Movimentos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: Date;

  @Column()
  conta_id: number;

  @Column()
  categoria_id: number;

  @Column()
  tipo: 'C' | 'D';

  @Column({ default : true})
  is_pago: boolean;

  @Column()
  quantidade_parcelas: number;

  @Column()
  descricao: string;

  @Column('decimal')
  valor: number;

  @Column({ default : true })
  is_ativo: boolean;

}
