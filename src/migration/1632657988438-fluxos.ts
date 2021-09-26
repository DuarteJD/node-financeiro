import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class fluxos1632657988438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

      await queryRunner.createTable(
        new Table({
          name: 'fluxos',
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
              name: 'Descricao',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'valor',
              type: 'decimal',
              precision: 11,
              scale: 2,
              default: 0,
            },
            {
              name: 'conta_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'tipo',
              type: 'varchar',
              isNullable: false,
              comment: 'D=Débito C=Crédito',
            },
          ],
          foreignKeys: [
            {
              name: 'fk_fluxos_conta_id',
              columnNames: ['conta_id'],
              referencedTableName: 'contas',
              referencedColumnNames: ['id'],
            },
            {
              name: 'fk_fluxos_empresa_id',
              columnNames: ['empresa_id'],
              referencedTableName: 'empresas',
              referencedColumnNames: ['id'],
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("fluxos", 'fk_fluxos_empresa_id');
      await queryRunner.dropForeignKey("fluxos", 'fk_fluxos_conta_id');
      await queryRunner.dropTable('fluxos');
    }

}
