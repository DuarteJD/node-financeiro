import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class baixas1632658301624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(
        new Table({
          name: 'baixas',
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
              name: 'valor_total',
              type: 'decimal',
              precision: 11,
              scale: 2,
              default: 0,
            },
            {
              name: 'ajustes',
              type: 'decimal',
              precision: 11,
              scale: 2,
              default: 0,
            },
            {
              name: 'tipo',
              type: 'varchar',
              isNullable: false,
              comment: 'D=Débito C=Crédito',
            },
            {
              name: 'fluxo_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'titulo_ajuste_id',
              type: 'uuid',
              isNullable: true,
            },
          ],
          foreignKeys: [
            {
              name: 'fk_baixas_fluxo_id',
              columnNames: ['fluxo_id'],
              referencedTableName: 'fluxos',
              referencedColumnNames: ['id'],
            },
            {
              name: 'fk_baixas_titulo_ajuste_id',
              columnNames: ['titulo_ajuste_id'],
              referencedTableName: 'titulos',
              referencedColumnNames: ['id'],
            },
            {
              name: 'fk_baixas_empresa_id',
              columnNames: ['empresa_id'],
              referencedTableName: 'empresas',
              referencedColumnNames: ['id'],
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("baixas", 'fk_baixas_fluxo_id');
      await queryRunner.dropForeignKey("baixas", 'fk_baixas_titulo_ajuste_id');
      await queryRunner.dropForeignKey("baixas", 'fk_baixas_empresa_id');
      await queryRunner.dropTable('baixas');
    }

}
