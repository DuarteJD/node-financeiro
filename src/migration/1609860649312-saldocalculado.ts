import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class saldocalculado1609860649312 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'saldocalculado',
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
            name: 'data',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'conta_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'saldo',
            type: 'decimal',
            precision: 11,
            scale: 2,
            default: 0,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_saldocalculado_contas_id',
            columnNames: ['conta_id'],
            referencedTableName: 'contas',
            referencedColumnNames: ['id']
          },
          {
            name: 'fk_saldocalculado_empresa_id',
            columnNames: ['empresa_id'],
            referencedTableName: 'empresas',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("saldocalculado", 'fk_saldocalculado_empresa_id');
    await queryRunner.dropTable('saldocalculado');
  }

}
