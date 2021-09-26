import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class recorrente1526535623530 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'recorrentes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'empresa_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'categoria_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
          {
            name: 'conta_id',
            type: 'uuid',
            isNullable: true,
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
            name: 'tipo',
            type: 'varchar',
            isNullable: false,
            comment: 'D=Débito C=Crédito',
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'dia',
            type: 'int',
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
            name: 'fk_recorrente_conta_id',
            columnNames: ['conta_id'],
            referencedTableName: 'contas',
            referencedColumnNames: ['id'],
          },

          {
            name: 'fk_recorrente_categoria_id',
            columnNames: ['categoria_id'],
            referencedTableName: 'categorias',
            referencedColumnNames: ['id'],
          },
          {
            name: 'fk_recorrentes_empresa_id',
            columnNames: ['empresa_id'],
            referencedTableName: 'empresas',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("recorrentes", 'fk_recorrente_conta_id');
    await queryRunner.dropForeignKey("recorrentes", 'fk_recorrente_categoria_id');
    await queryRunner.dropForeignKey("recorrentes", 'fk_recorrentes_empresa_id');
    await queryRunner.dropTable('recorrentes');
  }
}
