import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class baixastitulos1632658695517 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(
        new Table({
          name: 'baixas_titulos',
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
              name: 'titulo_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'valor_saldo',
              type: 'decimal',
              precision: 11,
              scale: 2,
              default: 0,
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
              name: 'fk_baixastitulos_baixa_id',
              columnNames: ['baixa_id'],
              referencedTableName: 'baixas',
              referencedColumnNames: ['id'],
            },
            {
              name: 'fk_baixastitulos_titulo_id',
              columnNames: ['titulo_id'],
              referencedTableName: 'titulos',
              referencedColumnNames: ['id'],
            },
            {
              name: 'fk_baixastitulos_empresa_id',
              columnNames: ['empresa_id'],
              referencedTableName: 'empresas',
              referencedColumnNames: ['id'],
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("baixas_titulos", 'fk_baixastitulos_baixa_id');
      await queryRunner.dropForeignKey("baixas_titulos", 'fk_baixastitulos_titulo_id');
      await queryRunner.dropForeignKey("baixas_titulos", 'fk_baixastitulos_empresa_id');
      await queryRunner.dropTable('baixas_titulos');
    }

}
