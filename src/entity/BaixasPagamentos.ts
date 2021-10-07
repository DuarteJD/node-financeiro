import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('baixas_pagamento')
export class BaixasPagamentos {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  empresa_id: string;

  @Column('uuid')
  baixa_id: string;

  @Column('timestamp with time zone')
  data: Date;

  @Column('uuid')
  conta_id: string;

  @Column('double precision')
  valor_pago: number;
}
