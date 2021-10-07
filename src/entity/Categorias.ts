import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('categorias')
export class Categorias {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  nome: string;

  @Column('uuid')
  empresa_id: string;

  @Column({ length : 1})
  tipo: 'C' | 'D' | 'T';

  @Column({default: true })
  is_ativo: boolean;
}
