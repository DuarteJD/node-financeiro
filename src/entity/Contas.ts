import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('contas')
export class Contas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column('decimal')
  saldo_inicial: number;

  @Column({default: true })
  is_ativo: boolean;
}
