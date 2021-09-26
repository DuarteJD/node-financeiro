import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class baixaspagamento1632658852771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(
        new Table({
          name: 'baixas_pagamento',
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
              name: 'baixa_id',
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
              name: 'valor_pago',
              type: 'decimal',
              precision: 11,
              scale: 2,
              default: 0,
            },
          ],
          foreignKeys: [
            {
              name: 'fk_baixaspagamento_baixa_id',
              columnNames: ['baixa_id'],
              referencedTableName: 'baixas',
              referencedColumnNames: ['id'],
            },
            {
              name: 'fk_baixaspagamento_conta_id',
              columnNames: ['conta_id'],
              referencedTableName: 'contas',
              referencedColumnNames: ['id'],
            },
            {
              name: 'fk_baixaspagamento_empresa_id',
              columnNames: ['empresa_id'],
              referencedTableName: 'empresas',
              referencedColumnNames: ['id'],
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("baixas_pagamento", 'fk_baixaspagamento_baixa_id');
      await queryRunner.dropForeignKey("baixas_pagamento", 'fk_baixaspagamento_conta_id');
      await queryRunner.dropForeignKey("baixas_pagamento", 'fk_baixaspagamento_empresa_id');
      await queryRunner.dropTable('baixas_pagamento');
    }

}
