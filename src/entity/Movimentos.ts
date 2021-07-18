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

  @Column('uuid')
  transferencia_conta_id: string;

  @Column('uuid')
  categoria_id: string;

  @Column()
  tipo: 'C' | 'D' | 'T';

  @Column({ default : false})
  is_recorrente: boolean;

  @Column('uuid')
  recorrente_id: string;

  @Column()
  descricao: string;

  @Column('decimal')
  valor: number;

  @Column({ default : true })
  is_ativo: boolean;

}
