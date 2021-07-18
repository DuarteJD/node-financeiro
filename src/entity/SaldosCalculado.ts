import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('saldocalculado')
export class SaldosCalculado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  data: Date;

  @Column('uuid')
  conta_id: string;

  @Column('decimal')
  saldo: number;
}
