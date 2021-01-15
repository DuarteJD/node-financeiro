import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('saldocalculado')
export class SaldosCalculado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: Date;

  @Column()
  conta_id: number;

  @Column('decimal')
  saldo: number;
}
