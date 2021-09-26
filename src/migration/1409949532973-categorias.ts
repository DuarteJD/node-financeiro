import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class categorias1409949532973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(
        new Table({
          name: 'categorias',
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
              name: 'nome',
              length: '60',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'tipo',
              type: 'varchar',
              length: '1',
              comment: 'D=Débito C=Crédito',
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
              name: 'fk_categorias_empresa_id',
              columnNames: ['empresa_id'],
              referencedTableName: 'empresas',
              referencedColumnNames: ['id'],
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("categorias", 'fk_categorias_empresa_id');
      await queryRunner.dropTable('categorias');
    }
  }
