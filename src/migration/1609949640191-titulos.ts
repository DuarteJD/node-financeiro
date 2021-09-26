import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class movimento1609949640191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'titulos',
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
            name: 'emissao',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'vencimento',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'tipo',
            type: 'varchar',
            isNullable: false,
            comment: 'D=Débito C=Crédito',
          },
          {
            name: 'parcela',
            type: 'numeric',
            isNullable: false,
            default: 1
          },
          {
            name: 'qtde_parcelas',
            type: 'numeric',
            isNullable: false,
            default: 1
          },
          {
            name: 'valor_parcela',
            type: 'decimal',
            precision: 11,
            scale: 2,
            default: 0,
            isNullable: false,
          },
          {
            name: 'valor_saldo',
            type: 'decimal',
            precision: 11,
            scale: 2,
            default: 0,
            isNullable: false,
          },
          {
            name: 'valor_fatura',
            type: 'decimal',
            precision: 11,
            scale: 2,
            default: 0,
            isNullable: false,
          },
          {
            name: 'fatura_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'conta_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'categoria_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'situacao',
            type: 'numeric',
            isNullable: false,
            default: 1,
            comment: '1=Pendente 2=Cancelado 3=Pago total',
          },
          {
            name: 'recorrente_id',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_titulos_conta_id',
            columnNames: ['conta_id'],
            referencedTableName: 'contas',
            referencedColumnNames: ['id']
          },
          {
            name: 'fk_titulos_fatura_id',
            columnNames: ['fatura_id'],
            referencedTableName: 'titulos',
            referencedColumnNames: ['id']
          },
          {
            name: 'fk_titulos_categoria_id',
            columnNames: ['categoria_id'],
            referencedTableName: 'categorias',
            referencedColumnNames: ['id']
          },
          {
            name: 'fk_titulos_recorrente_id',
            columnNames: ['recorrente_id'],
            referencedTableName: 'recorrentes',
            referencedColumnNames: ['id']
          },
          {
            name: 'fk_titulos_empresa_id',
            columnNames: ['empresa_id'],
            referencedTableName: 'empresas',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("titulos", 'fk_titulos_empresa_id');
    await queryRunner.dropForeignKey("titulos", 'fk_titulos_conta_id');
    await queryRunner.dropForeignKey("titulos", 'fk_titulos_recorrente_id');
    await queryRunner.dropForeignKey("titulos", 'fk_titulos_fatura_id');
    await queryRunner.dropForeignKey("titulos", 'fk_titulos_categoria_id');
    await queryRunner.dropTable('titulos');
  }
}
