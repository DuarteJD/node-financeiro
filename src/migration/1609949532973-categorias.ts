import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class categorias1609949532973 implements MigrationInterface {

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
              name: 'nome',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'is_ativo',
              type: 'boolean',
              isNullable: false,
              default: true
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('categorias');
    }
  }
