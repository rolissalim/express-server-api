import { DBTable } from "../../constants/DBTable";
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePersonalTokenTable1692634172842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: DBTable.OAUTH_TOKENS,
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_id",
                        type: "char",
                        length: "50",
                        generationStrategy: "uuid"
                    },
                    {
                        name: "access_token",
                        type: "LONGTEXT",
                    },
                    {
                        name: "refresh_token",
                        type: "LONGTEXT",
                    },
                    {
                        name: "expires_in",
                        type: "bigint",
                        isNullable: true,
                    },
                    {
                        name: "is_active",
                        type: "enum",
                        enum: ['1', '0'],
                        comment: "1=active, 0=deactive"
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
        await queryRunner.dropTable(DBTable.OAUTH_TOKENS);
    }

}
