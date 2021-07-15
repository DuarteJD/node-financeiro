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
            type: 'date',
            isNullable: false,
          },
          {
            name: 'conta_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'categoria_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'tipo',
            type: 'varchar',
            isNullable: false,
            comment: 'D=Débito C=Crédito',
          },
          {
            name: 'is_pago',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'quantidade_parcelas',
            type: 'int',
            isNullable: true,
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
        ],
        foreignKeys: [
          {
            name: 'fk_conta_movimento',
            columnNames: ['conta_id'],
            referencedTableName: 'contas',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_categoria_movimento',
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
    await queryRunner.dropTable('movimentos');
  }
}
