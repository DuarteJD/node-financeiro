import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity('empresas')
export class Empresas {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60})
  nome: string;

  @Column({ length: 255})
  email: string;

  @Column({ length: 255})
  senha: string;

  @Column({ length: 255})
  reset_senha: string;

  @Column({ default: true })
  is_ativo: boolean;

}
