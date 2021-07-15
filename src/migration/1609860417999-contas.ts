import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class contas1609860417999 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'contas',
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
            name: 'saldo_inicial',
            type: 'decimal',
            precision: 7,
            scale: 2,
            default: 0,
          },
          {
            name: 'is_cartao',
            type: 'boolean',
            isNullable: false,
            default: false
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
    await queryRunner.dropTable('contas');
  }
}
