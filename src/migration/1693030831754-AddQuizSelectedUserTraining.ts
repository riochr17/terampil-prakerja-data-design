import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuizSelectedUserTraining1693030831754 implements MigrationInterface {
    name = 'AddQuizSelectedUserTraining1693030831754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UserTrainingScheduleQuizSelected" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "group_quiz_id" integer, "material_quiz_id" integer, "user_training_schedule_id" integer, CONSTRAINT "PK_6fc92aeb33c089d7f024abe79bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" ADD CONSTRAINT "FK_3d5353cb7d4719364b93a310f29" FOREIGN KEY ("group_quiz_id") REFERENCES "GroupQuiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" ADD CONSTRAINT "FK_c689789d97a545584944e374fd5" FOREIGN KEY ("material_quiz_id") REFERENCES "MaterialQuiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" ADD CONSTRAINT "FK_a63859c8c845f7baefcfa7df52e" FOREIGN KEY ("user_training_schedule_id") REFERENCES "UserTrainingSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" DROP CONSTRAINT "FK_a63859c8c845f7baefcfa7df52e"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" DROP CONSTRAINT "FK_c689789d97a545584944e374fd5"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" DROP CONSTRAINT "FK_3d5353cb7d4719364b93a310f29"`);
        await queryRunner.query(`DROP TABLE "UserTrainingScheduleQuizSelected"`);
    }

}
