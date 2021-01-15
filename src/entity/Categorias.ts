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
  tipo: number;

  @Column({default: true })
  is_ativo: boolean;
}
