import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('baixas_titulos')
export class BaixasTitulos {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @Column('uuid')
  baixa_id: string;

  @Column('uuid')
  titulo_id: string;

  @Column('double precision')
  valor_saldo: number;

  @Column('double precision')
  valor_pago: number;

}
