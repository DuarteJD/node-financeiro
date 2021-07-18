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

  @Column()
  data_saldo: Date;

  @Column()
  melhor_dia_compra: Number;

  @Column('decimal')
  saldo_inicial: number;

  @Column({default: true })
  is_ativo: boolean;

  @Column({default: false })
  is_cartao: boolean;
}
