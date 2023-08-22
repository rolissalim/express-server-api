import { MigrationInterface, QueryRunner } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entities/User"

export class DatabaseSeeder1690466846793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // insert user
        await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    name: "admin",
                    email: "admin@gmail.com",
                    password: "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
                },
            ]).execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
