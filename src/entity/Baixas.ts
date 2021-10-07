import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('baixas')
export class Baixas {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @Column('timestamp with time zone')
  data: Date;

  @Column('double precision')
  valor_total: number;

  @Column('double precision')
  ajustes: number;

  @Column({ length : 1})
  tipo: 'C' | 'D';

  @Column('uuid')
  fluxo_id: string;

  @Column('uuid')
  titulo_ajuste_id: string;
}
