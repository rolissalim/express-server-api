import { DBTable } from "../../constants/DBTable";
import { MigrationInterface, QueryRunner, Table } from "typeorm"
export class CreateItemsTable1692631186413 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: DBTable.ITEMS,
                columns: [
                    {
                        name: "id",
                        type: "char",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        length: "50"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100"
                    },
                    {
                        name: "purchase_price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0
                    },
                    {
                        name: "selling_price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        default: 0
                    },
                    {
                        name: "stock",
                        type: "integer",
                        default: 0
                    },
                    {
                        name: "image",
                        type: "varchar",
                        length: "150"
                    },
                    {
                        name: "created_at",
                        type: "datetime",
                        default: "now()",
                        isNullable: true,
                    },
                    {
                        name: "updated_at",
                        type: "datetime",
                        default: "now()",
                        isNullable: true,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DBTable.ITEMS);
    }


}
