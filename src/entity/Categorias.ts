import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('categorias')
export class Categorias {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  tipo: 'C' | 'D';

  @Column({default: true })
  is_ativo: boolean;
}
