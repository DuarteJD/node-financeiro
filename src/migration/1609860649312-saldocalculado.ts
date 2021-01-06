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
            name: 'data',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'contacorrente_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'saldo',
            type: 'decimal',
            precision: 7,
            scale: 2,
            default: 0,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_conta_corrente_saldo',
            columnNames: ['contacorrente_id'],
            referencedTableName: 'contacorrentes',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ],
      }),
    );
  }


  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('saldocalculado');
  }

}
