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

  @Column('uuid')
  conta_id: string;

  @Column()
  transferencia_conta_id: number;

  @Column('uuid')
  categoria_id: string;

  @Column()
  tipo: 'C' | 'D' | 'T';

  @Column({ default : true})
  is_pago: boolean;

  @Column({ default : false})
  is_recorrente: boolean;

  @Column()
  quantidade_parcelas: number;

  @Column('uuid')
  recorrente_id: string;

  @Column()
  descricao: string;

  @Column('decimal')
  valor: number;

  @Column({ default : true })
  is_ativo: boolean;

}
