import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('contas')
export class Contas {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length : 60})
  nome: string;

  @Column('uuid')
  empresa_id: string;

  @Column('decimal')
  saldo_inicial: number;

  @Column('decimal')
  limite_credito: number;

  @Column('date')
  data_saldo: Date;

  @Column({default: false })
  is_cartao: boolean;

  @Column()
  vencimento_fatura: Number;

  @Column()
  fechamento_fatura: Number;

  @Column({default: true })
  is_ativo: boolean;
}
