import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuizAddTrainingScheduleSession1692766805234 implements MigrationInterface {
    name = 'UpdateQuizAddTrainingScheduleSession1692766805234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP CONSTRAINT "FK_58ded3fced80aa48b6e6a8088ac"`);
        await queryRunner.query(`ALTER TABLE "QuizQuestion" DROP CONSTRAINT "FK_a5f84a1d639e84253716c1d5e8e"`);
        await queryRunner.query(`ALTER TABLE "QuizQuestion" RENAME COLUMN "material_quiz_id" TO "quiz_id"`);
        await queryRunner.query(`CREATE TABLE "TrainingScheduleSession" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "training_schedule_id" integer, "training_session_id" integer, CONSTRAINT "PK_11d777e440cc9f6fbf042af8b0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TrainingLocation" ("id" SERIAL NOT NULL, "city_name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "training_id" integer, CONSTRAINT "PK_151eb7f505929c7cc89a2204d12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Quiz_type_enum" AS ENUM('PRE', 'POST', 'QUIZ')`);
        await queryRunner.query(`CREATE TABLE "Quiz" ("id" SERIAL NOT NULL, "type" "public"."Quiz_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_eabdbcab2b862532e782fa96d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "training_id"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "__title__hapus" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "__start_date__hapus" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "__end_date__hapus" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "training_location_id" integer`);
        await queryRunner.query(`ALTER TABLE "MaterialQuiz" ADD "quiz_id" integer`);
        await queryRunner.query(`ALTER TABLE "TrainingScheduleSession" ADD CONSTRAINT "FK_90079ef80e6f11c202257bf44b0" FOREIGN KEY ("training_schedule_id") REFERENCES "TrainingSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainingScheduleSession" ADD CONSTRAINT "FK_abc251c81defbd9403c91837afd" FOREIGN KEY ("training_session_id") REFERENCES "TrainingSession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainingLocation" ADD CONSTRAINT "FK_64f37ac1d55eea9972ee2f3adfc" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD CONSTRAINT "FK_021828d64ee0e883cdc054a78b8" FOREIGN KEY ("training_location_id") REFERENCES "TrainingLocation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "QuizQuestion" ADD CONSTRAINT "FK_c6fe6edca916c7b3ccf72e04458" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MaterialQuiz" ADD CONSTRAINT "FK_a8033ccf2546fc9a9634341c5d6" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MaterialQuiz" DROP CONSTRAINT "FK_a8033ccf2546fc9a9634341c5d6"`);
        await queryRunner.query(`ALTER TABLE "QuizQuestion" DROP CONSTRAINT "FK_c6fe6edca916c7b3ccf72e04458"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP CONSTRAINT "FK_021828d64ee0e883cdc054a78b8"`);
        await queryRunner.query(`ALTER TABLE "TrainingLocation" DROP CONSTRAINT "FK_64f37ac1d55eea9972ee2f3adfc"`);
        await queryRunner.query(`ALTER TABLE "TrainingScheduleSession" DROP CONSTRAINT "FK_abc251c81defbd9403c91837afd"`);
        await queryRunner.query(`ALTER TABLE "TrainingScheduleSession" DROP CONSTRAINT "FK_90079ef80e6f11c202257bf44b0"`);
        await queryRunner.query(`ALTER TABLE "MaterialQuiz" DROP COLUMN "quiz_id"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "training_location_id"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "__end_date__hapus"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "__start_date__hapus"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "__title__hapus"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "end_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "start_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "training_id" integer`);
        await queryRunner.query(`DROP TABLE "Quiz"`);
        await queryRunner.query(`DROP TYPE "public"."Quiz_type_enum"`);
        await queryRunner.query(`DROP TABLE "TrainingLocation"`);
        await queryRunner.query(`DROP TABLE "TrainingScheduleSession"`);
        await queryRunner.query(`ALTER TABLE "QuizQuestion" RENAME COLUMN "quiz_id" TO "material_quiz_id"`);
        await queryRunner.query(`ALTER TABLE "QuizQuestion" ADD CONSTRAINT "FK_a5f84a1d639e84253716c1d5e8e" FOREIGN KEY ("material_quiz_id") REFERENCES "MaterialQuiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD CONSTRAINT "FK_58ded3fced80aa48b6e6a8088ac" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
