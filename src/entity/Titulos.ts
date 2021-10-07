import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('titulos')
export class Titulos {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @Column('timestamp with time zone')
  emissao: Date;

  @Column('timestamp with time zone')
  vencimento: Date;

  @Column({ length : 1})
  tipo: 'C' | 'D';

  @Column('numeric')
  parcela: number;

  @Column('numeric')
  qtde_parcelas: number;

  @Column('double precision')
  valor_parcela: number;

  @Column('double precision')
  valor_saldo: number;

  @Column('double precision')
  valor_fatura: number;

  @Column({ length: 255})
  descricao: string;

  @Column({ length : 1})
  situacao: '1' | '2' | '3';

  @Column('uuid')
  fatura_id: string;

  @Column('uuid')
  conta_id: string;

  @Column('uuid')
  categoria_id: string;

  @Column('uuid')
  recorrente_id: string;

}
