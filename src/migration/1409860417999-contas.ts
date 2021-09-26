import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class contas1409860417999 implements MigrationInterface {

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
            name: 'empresa_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'saldo_inicial',
            type: 'decimal',
            precision: 11,
            scale: 2,
            default: 0,
          },
          {
            name: 'limite_credito',
            type: 'decimal',
            precision: 11,
            scale: 2,
            default: 0,
          },
          {
            name: 'data_saldo',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'is_cartao',
            type: 'boolean',
            default: false
          },
          {
            name: 'vencimento_fatura',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fechamento_fatura',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'is_ativo',
            type: 'boolean',
            default: true
          },
        ],
        foreignKeys: [
          {
            name: 'fk_contas_empresa_id',
            columnNames: ['empresa_id'],
            referencedTableName: 'empresas',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("contas", 'fk_contas_empresa_id');
    await queryRunner.dropTable('contas');
  }
}
