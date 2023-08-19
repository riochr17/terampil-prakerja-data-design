import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1692444424519 implements MigrationInterface {
    name = 'Init1692444424519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "QuestionAnswer" ("id" SERIAL NOT NULL, "answer" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "quiz_question_id" integer, CONSTRAINT "PK_e047c446cfc221e3b516a5fe69b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "MaterialAssignment" ("id" SERIAL NOT NULL, "open_assignment_ts" TIMESTAMP NOT NULL, "close_assignment_ts" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "session_material_id" integer, CONSTRAINT "PK_cb04ca9bd200e837ab596c8bbe5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserAssignment" ("id" SERIAL NOT NULL, "data" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_training_id" integer, "material_assignment_id" integer, CONSTRAINT "PK_93b397c7d8f37c52943e8445259" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "MaterialOnlineClass" ("id" SERIAL NOT NULL, "meeting_url" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "session_material_id" integer, CONSTRAINT "PK_f6103ceccf59ba18fceea11d07a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."UserOnlineCheck_type_enum" AS ENUM('IN', 'OUT')`);
        await queryRunner.query(`CREATE TABLE "UserOnlineCheck" ("id" SERIAL NOT NULL, "type" "public"."UserOnlineCheck_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_training_id" integer, "material_online_class_id" integer, CONSTRAINT "PK_c07cbed649a2518f712c00ae2ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "MaterialOfflineClass" ("id" SERIAL NOT NULL, "location" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "session_material_id" integer, CONSTRAINT "PK_2f30a5932282e86b250503c982f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."UserOfflineCheck_type_enum" AS ENUM('IN', 'OUT')`);
        await queryRunner.query(`CREATE TABLE "UserOfflineCheck" ("id" SERIAL NOT NULL, "type" "public"."UserOfflineCheck_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_training_id" integer, "material_offline_class_id" integer, CONSTRAINT "PK_a4ae7617829cea8a195d12d788c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Certificate" ("id" SERIAL NOT NULL, "issued_at" TIMESTAMP NOT NULL, "serial_number" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_training_id" integer, CONSTRAINT "PK_8c14df817ac1c729821b1bc7e55" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Invoice" ("id" SERIAL NOT NULL, "invoice_number" character varying(255) NOT NULL, "redeem_code" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_training_id" integer, CONSTRAINT "PK_0ead03cb5a20e5a5cc4d6defbe6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."User_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "fullname" character varying(255) NOT NULL, "profile_picture_url" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "gender" "public"."User_gender_enum" NOT NULL, "active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TrainingSchedule" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "quota" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "training_id" integer, CONSTRAINT "PK_2494710418060e4e95d47b98fda" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserTrainingSchedule" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, "training_schedule_id" integer, CONSTRAINT "PK_a8f98628efdaf1e9f9e3f61475e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UserQuizQuestionAnswer" ("id" SERIAL NOT NULL, "answer" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_training_id" integer, "quiz_question_id" integer, CONSTRAINT "PK_eeae5482713985da4c3f5269818" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "QuizQuestion" ("id" SERIAL NOT NULL, "question" text NOT NULL, "answer" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "material_quiz_id" integer, CONSTRAINT "PK_3094d1c0cbe9bcf90fc5d59fec8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."MaterialQuiz_type_enum" AS ENUM('PRE', 'POST', 'QUIZ')`);
        await queryRunner.query(`CREATE TABLE "MaterialQuiz" ("id" SERIAL NOT NULL, "type" "public"."MaterialQuiz_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "session_material_id" integer, CONSTRAINT "PK_22ff4bd7e444509464ac896bc97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."SessionMaterial_type_enum" AS ENUM('QUIZ', 'ASSIGNMENT')`);
        await queryRunner.query(`CREATE TABLE "SessionMaterial" ("id" SERIAL NOT NULL, "type" "public"."SessionMaterial_type_enum" NOT NULL, "title" character varying(255) NOT NULL, "order" integer NOT NULL, "start_seconds" integer NOT NULL, "duration_seconds" integer NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "training_session_id" integer, CONSTRAINT "PK_520be62f4dee33887f7405be100" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TrainingSession" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "order" integer NOT NULL, "start_day" integer NOT NULL, "duration_day" integer NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "training_id" integer, CONSTRAINT "PK_2fa8a12fa131a6d37108bc1728a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Trainer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "profile_picture_url" character varying(255) NOT NULL, "description" text NOT NULL, "occupation" character varying(255) NOT NULL, "signature_image_url" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_2feaa059f4eee4f568f9cbe9293" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Training_type_enum" AS ENUM('WEBINAR', 'OFFLINE', 'BLENDED')`);
        await queryRunner.query(`CREATE TABLE "Training" ("id" SERIAL NOT NULL, "course_code" character varying(255) NOT NULL, "type" "public"."Training_type_enum" NOT NULL, "title" character varying(255) NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "trainer_id" integer, CONSTRAINT "PK_d55b0c7f8b7256ef36a6d1df3d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TrainingLibrary" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "training_id" integer, "library_id" integer, CONSTRAINT "PK_6f3fc3e3402e7e9dc3e5bbcbe2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Library_type_enum" AS ENUM('EBOOK')`);
        await queryRunner.query(`CREATE TABLE "Library" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" text NOT NULL, "type" "public"."Library_type_enum" NOT NULL, "content_url" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_4c554e3566b62825de70121da37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Setting" ("id" SERIAL NOT NULL, "key" character varying(255) NOT NULL, "value" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_37a4df0537616f793f38ce85481" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswer" ADD CONSTRAINT "FK_9d4c18966beaf606480f0c12d08" FOREIGN KEY ("quiz_question_id") REFERENCES "QuizQuestion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MaterialAssignment" ADD CONSTRAINT "FK_d0bc3d98345b6af48b205f241e2" FOREIGN KEY ("session_material_id") REFERENCES "SessionMaterial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserAssignment" ADD CONSTRAINT "FK_f3dcacc1365f1f6cc873045d77b" FOREIGN KEY ("user_training_id") REFERENCES "UserTrainingSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserAssignment" ADD CONSTRAINT "FK_8cfe568fb0120cdcf4d81352393" FOREIGN KEY ("material_assignment_id") REFERENCES "MaterialAssignment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MaterialOnlineClass" ADD CONSTRAINT "FK_9c2ff8daa6a5289fd0be9a608b5" FOREIGN KEY ("session_material_id") REFERENCES "SessionMaterial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserOnlineCheck" ADD CONSTRAINT "FK_10a5df1e9b0a457eceef96ce85d" FOREIGN KEY ("user_training_id") REFERENCES "UserTrainingSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserOnlineCheck" ADD CONSTRAINT "FK_3b1fda24310bcc4de6c9aeb640d" FOREIGN KEY ("material_online_class_id") REFERENCES "MaterialOnlineClass"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MaterialOfflineClass" ADD CONSTRAINT "FK_2363641e3de7ca51ad1657d6286" FOREIGN KEY ("session_material_id") REFERENCES "SessionMaterial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserOfflineCheck" ADD CONSTRAINT "FK_941f13f76c19aace332edb504d5" FOREIGN KEY ("user_training_id") REFERENCES "UserTrainingSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserOfflineCheck" ADD CONSTRAINT "FK_2aed945a3097bb91e3783f967ee" FOREIGN KEY ("material_offline_class_id") REFERENCES "MaterialOfflineClass"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Certificate" ADD CONSTRAINT "FK_0928d1ed684fe426cccdcd3b93c" FOREIGN KEY ("user_training_id") REFERENCES "UserTrainingSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Invoice" ADD CONSTRAINT "FK_64a4bbf4b1e467dff19bf9231fc" FOREIGN KEY ("user_training_id") REFERENCES "UserTrainingSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD CONSTRAINT "FK_58ded3fced80aa48b6e6a8088ac" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD CONSTRAINT "FK_3b8923b48de57fd9df0dc97f198" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD CONSTRAINT "FK_e009a58574001914cad91da9636" FOREIGN KEY ("training_schedule_id") REFERENCES "TrainingSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserQuizQuestionAnswer" ADD CONSTRAINT "FK_d7e691ce95a148f6166f9df3ccf" FOREIGN KEY ("user_training_id") REFERENCES "UserTrainingSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserQuizQuestionAnswer" ADD CONSTRAINT "FK_b4378d983f9fba9f672663f7342" FOREIGN KEY ("quiz_question_id") REFERENCES "QuizQuestion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "QuizQuestion" ADD CONSTRAINT "FK_a5f84a1d639e84253716c1d5e8e" FOREIGN KEY ("material_quiz_id") REFERENCES "MaterialQuiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MaterialQuiz" ADD CONSTRAINT "FK_668f5a8b97a0d40011a10497872" FOREIGN KEY ("session_material_id") REFERENCES "SessionMaterial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SessionMaterial" ADD CONSTRAINT "FK_9568f41ad28c6679893329ddd56" FOREIGN KEY ("training_session_id") REFERENCES "TrainingSession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainingSession" ADD CONSTRAINT "FK_44bb84e633bb084417a088b6ecc" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Training" ADD CONSTRAINT "FK_9cee2daf421b76fb113ac26f2a3" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainingLibrary" ADD CONSTRAINT "FK_b5344f986afcb6e5e0363480eaf" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainingLibrary" ADD CONSTRAINT "FK_c3800d74bbaf4325c1a5b074711" FOREIGN KEY ("library_id") REFERENCES "Library"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrainingLibrary" DROP CONSTRAINT "FK_c3800d74bbaf4325c1a5b074711"`);
        await queryRunner.query(`ALTER TABLE "TrainingLibrary" DROP CONSTRAINT "FK_b5344f986afcb6e5e0363480eaf"`);
        await queryRunner.query(`ALTER TABLE "Training" DROP CONSTRAINT "FK_9cee2daf421b76fb113ac26f2a3"`);
        await queryRunner.query(`ALTER TABLE "TrainingSession" DROP CONSTRAINT "FK_44bb84e633bb084417a088b6ecc"`);
        await queryRunner.query(`ALTER TABLE "SessionMaterial" DROP CONSTRAINT "FK_9568f41ad28c6679893329ddd56"`);
        await queryRunner.query(`ALTER TABLE "MaterialQuiz" DROP CONSTRAINT "FK_668f5a8b97a0d40011a10497872"`);
        await queryRunner.query(`ALTER TABLE "QuizQuestion" DROP CONSTRAINT "FK_a5f84a1d639e84253716c1d5e8e"`);
        await queryRunner.query(`ALTER TABLE "UserQuizQuestionAnswer" DROP CONSTRAINT "FK_b4378d983f9fba9f672663f7342"`);
        await queryRunner.query(`ALTER TABLE "UserQuizQuestionAnswer" DROP CONSTRAINT "FK_d7e691ce95a148f6166f9df3ccf"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP CONSTRAINT "FK_e009a58574001914cad91da9636"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP CONSTRAINT "FK_3b8923b48de57fd9df0dc97f198"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP CONSTRAINT "FK_58ded3fced80aa48b6e6a8088ac"`);
        await queryRunner.query(`ALTER TABLE "Invoice" DROP CONSTRAINT "FK_64a4bbf4b1e467dff19bf9231fc"`);
        await queryRunner.query(`ALTER TABLE "Certificate" DROP CONSTRAINT "FK_0928d1ed684fe426cccdcd3b93c"`);
        await queryRunner.query(`ALTER TABLE "UserOfflineCheck" DROP CONSTRAINT "FK_2aed945a3097bb91e3783f967ee"`);
        await queryRunner.query(`ALTER TABLE "UserOfflineCheck" DROP CONSTRAINT "FK_941f13f76c19aace332edb504d5"`);
        await queryRunner.query(`ALTER TABLE "MaterialOfflineClass" DROP CONSTRAINT "FK_2363641e3de7ca51ad1657d6286"`);
        await queryRunner.query(`ALTER TABLE "UserOnlineCheck" DROP CONSTRAINT "FK_3b1fda24310bcc4de6c9aeb640d"`);
        await queryRunner.query(`ALTER TABLE "UserOnlineCheck" DROP CONSTRAINT "FK_10a5df1e9b0a457eceef96ce85d"`);
        await queryRunner.query(`ALTER TABLE "MaterialOnlineClass" DROP CONSTRAINT "FK_9c2ff8daa6a5289fd0be9a608b5"`);
        await queryRunner.query(`ALTER TABLE "UserAssignment" DROP CONSTRAINT "FK_8cfe568fb0120cdcf4d81352393"`);
        await queryRunner.query(`ALTER TABLE "UserAssignment" DROP CONSTRAINT "FK_f3dcacc1365f1f6cc873045d77b"`);
        await queryRunner.query(`ALTER TABLE "MaterialAssignment" DROP CONSTRAINT "FK_d0bc3d98345b6af48b205f241e2"`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswer" DROP CONSTRAINT "FK_9d4c18966beaf606480f0c12d08"`);
        await queryRunner.query(`DROP TABLE "Setting"`);
        await queryRunner.query(`DROP TABLE "Library"`);
        await queryRunner.query(`DROP TYPE "public"."Library_type_enum"`);
        await queryRunner.query(`DROP TABLE "TrainingLibrary"`);
        await queryRunner.query(`DROP TABLE "Training"`);
        await queryRunner.query(`DROP TYPE "public"."Training_type_enum"`);
        await queryRunner.query(`DROP TABLE "Trainer"`);
        await queryRunner.query(`DROP TABLE "TrainingSession"`);
        await queryRunner.query(`DROP TABLE "SessionMaterial"`);
        await queryRunner.query(`DROP TYPE "public"."SessionMaterial_type_enum"`);
        await queryRunner.query(`DROP TABLE "MaterialQuiz"`);
        await queryRunner.query(`DROP TYPE "public"."MaterialQuiz_type_enum"`);
        await queryRunner.query(`DROP TABLE "QuizQuestion"`);
        await queryRunner.query(`DROP TABLE "UserQuizQuestionAnswer"`);
        await queryRunner.query(`DROP TABLE "UserTrainingSchedule"`);
        await queryRunner.query(`DROP TABLE "TrainingSchedule"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TYPE "public"."User_gender_enum"`);
        await queryRunner.query(`DROP TABLE "Invoice"`);
        await queryRunner.query(`DROP TABLE "Certificate"`);
        await queryRunner.query(`DROP TABLE "UserOfflineCheck"`);
        await queryRunner.query(`DROP TYPE "public"."UserOfflineCheck_type_enum"`);
        await queryRunner.query(`DROP TABLE "MaterialOfflineClass"`);
        await queryRunner.query(`DROP TABLE "UserOnlineCheck"`);
        await queryRunner.query(`DROP TYPE "public"."UserOnlineCheck_type_enum"`);
        await queryRunner.query(`DROP TABLE "MaterialOnlineClass"`);
        await queryRunner.query(`DROP TABLE "UserAssignment"`);
        await queryRunner.query(`DROP TABLE "MaterialAssignment"`);
        await queryRunner.query(`DROP TABLE "QuestionAnswer"`);
    }

}
