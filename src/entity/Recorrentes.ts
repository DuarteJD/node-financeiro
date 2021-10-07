import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('recorrentes')
export class Recorrentes {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @Column('uuid')
  categoria_id: string;

  @Column('uuid')
  conta_id: string;

  @Column('double precision')
  valor: number;

  @Column({ length : 1})
  tipo: 'C' | 'D';

  @Column({ length: 60 })
  descricao: string;

  @Column()
  dia: number;

  @Column({default: true })
  is_ativo: boolean;
}
