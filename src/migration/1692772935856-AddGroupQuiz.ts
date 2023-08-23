import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGroupQuiz1692772935856 implements MigrationInterface {
    name = 'AddGroupQuiz1692772935856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MaterialQuiz" DROP CONSTRAINT "FK_a8033ccf2546fc9a9634341c5d6"`);
        await queryRunner.query(`CREATE TABLE "GroupQuiz" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "quiz_id" integer, "material_quiz_id" integer, CONSTRAINT "PK_e9bcec6e8f687cc63f4e3359b20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "MaterialQuiz" DROP COLUMN "quiz_id"`);
        await queryRunner.query(`ALTER TABLE "GroupQuiz" ADD CONSTRAINT "FK_495a588d15e1cdaa89e336abc00" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "GroupQuiz" ADD CONSTRAINT "FK_1d21c45d630d822f8eec4955087" FOREIGN KEY ("material_quiz_id") REFERENCES "MaterialQuiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "GroupQuiz" DROP CONSTRAINT "FK_1d21c45d630d822f8eec4955087"`);
        await queryRunner.query(`ALTER TABLE "GroupQuiz" DROP CONSTRAINT "FK_495a588d15e1cdaa89e336abc00"`);
        await queryRunner.query(`ALTER TABLE "MaterialQuiz" ADD "quiz_id" integer`);
        await queryRunner.query(`DROP TABLE "GroupQuiz"`);
        await queryRunner.query(`ALTER TABLE "MaterialQuiz" ADD CONSTRAINT "FK_a8033ccf2546fc9a9634341c5d6" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
