import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSessionMaterialType1692771718373 implements MigrationInterface {
    name = 'UpdateSessionMaterialType1692771718373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."SessionMaterial_type_enum" RENAME TO "SessionMaterial_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."SessionMaterial_type_enum" AS ENUM('PRETEST', 'QUIZ', 'POSTTEST', 'OFFLINECLASS', 'ONLINECLASS', 'ASSIGNMENT', 'SKILLTEST')`);
        await queryRunner.query(`ALTER TABLE "SessionMaterial" ALTER COLUMN "type" TYPE "public"."SessionMaterial_type_enum" USING "type"::"text"::"public"."SessionMaterial_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."SessionMaterial_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."SessionMaterial_type_enum_old" AS ENUM('QUIZ', 'ASSIGNMENT')`);
        await queryRunner.query(`ALTER TABLE "SessionMaterial" ALTER COLUMN "type" TYPE "public"."SessionMaterial_type_enum_old" USING "type"::"text"::"public"."SessionMaterial_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."SessionMaterial_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."SessionMaterial_type_enum_old" RENAME TO "SessionMaterial_type_enum"`);
    }

}
