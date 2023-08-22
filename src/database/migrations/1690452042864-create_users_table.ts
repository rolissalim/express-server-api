import { DBTable } from "../../constants/DBTable";
import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class CreateUsersTable1690452042864 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: DBTable.USERS,
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
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
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
        await queryRunner.dropTable(DBTable.USERS);
    }

}
