import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('fluxos')
export class Fluxos {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @Column('uuid')
  conta_id: string;

  @Column('timestamp with time zone')
  data: Date;

  @Column({ length: 255})
  descricao: string;

  @Column('double precision')
  valor: number;

  @Column({ length : 1})
  tipo: 'C' | 'D';
}
