import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class movimentosFkRecorrentes1626536247045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey('movimentos',
        new TableForeignKey({
          name: 'fk_movimento_recorrente_id',
          columnNames: ['recorrente_id'],
          referencedTableName: 'recorrentes',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('movimentos','fk_movimento_recorrente_id',);
    }

}
