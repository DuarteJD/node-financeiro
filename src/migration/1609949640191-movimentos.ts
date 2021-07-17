import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class movimento1609949640191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'movimentos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'data',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'conta_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'transferencia_conta_id',
            type: 'uuid',
            isNullable: true,
            default: null,
            comment: 'Conta corrente na qual será creditado o valor da transferência'
          },
          {
            name: 'categoria_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
          {
            name: 'tipo',
            type: 'varchar',
            isNullable: false,
            comment: 'D=Débito C=Crédito T=Transferência',
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'valor',
            type: 'decimal',
            precision: 11,
            scale: 2,
            default: 0,
            isNullable: false,
          },
          {
            name: 'is_ativo',
            type: 'boolean',
            isNullable: false,
            default: true
          },
          {
            name: 'is_recorrente',
            type: 'boolean',
            isNullable: false,
            default: true
          },
          {
            name: 'recorrente_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_movimento_conta_id',
            columnNames: ['conta_id'],
            referencedTableName: 'contas',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_movimento_conta_id_transferencia',
            columnNames: ['transferencia_conta_id'],
            referencedTableName: 'contas',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_movimento_categoria_id',
            columnNames: ['categoria_id'],
            referencedTableName: 'categorias',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("movimentos", 'fk_movimento_conta_id');
    await queryRunner.dropForeignKey("movimentos", 'fk_movimento_conta_id_transferencia');
    await queryRunner.dropForeignKey("movimentos", 'fk_movimento_categoria_id');
    await queryRunner.dropTable('movimentos');
  }
}
