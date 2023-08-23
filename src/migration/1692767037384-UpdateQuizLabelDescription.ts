import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuizLabelDescription1692767037384 implements MigrationInterface {
    name = 'UpdateQuizLabelDescription1692767037384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Quiz" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."Quiz_type_enum"`);
        await queryRunner.query(`ALTER TABLE "Quiz" ADD "label" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Quiz" ADD "description" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Quiz" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Quiz" DROP COLUMN "label"`);
        await queryRunner.query(`CREATE TYPE "public"."Quiz_type_enum" AS ENUM('PRE', 'POST', 'QUIZ')`);
        await queryRunner.query(`ALTER TABLE "Quiz" ADD "type" "public"."Quiz_type_enum" NOT NULL`);
    }

}
