import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserSelectedQuiz1693114337208 implements MigrationInterface {
    name = 'FixUserSelectedQuiz1693114337208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" DROP CONSTRAINT "FK_3d5353cb7d4719364b93a310f29"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" RENAME COLUMN "group_quiz_id" TO "quiz_id"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" ADD CONSTRAINT "FK_693a84d45dae65cfe7f3ee61df2" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" DROP CONSTRAINT "FK_693a84d45dae65cfe7f3ee61df2"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" RENAME COLUMN "quiz_id" TO "group_quiz_id"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingScheduleQuizSelected" ADD CONSTRAINT "FK_3d5353cb7d4719364b93a310f29" FOREIGN KEY ("group_quiz_id") REFERENCES "GroupQuiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
