import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class empresas1332659028757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(
        new Table({
          name: 'empresas',
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
              length: '60',
              isNullable: false,
            },
            {
              name: 'e-mail',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'senha',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'reset_senha',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'is_ativo',
              type: 'boolean',
              default: true
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('empresas');
    }

}
