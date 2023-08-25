import { MigrationInterface, QueryRunner } from "typeorm";

export class MajorDatabaseChanges1692968413320 implements MigrationInterface {
    name = 'MajorDatabaseChanges1692968413320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrainingLocation" RENAME COLUMN "city_name" TO "location"`);
        await queryRunner.query(`CREATE TABLE "TrainingCompetency" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "training_id" integer, CONSTRAINT "PK_fe88e2b7d4121f8d947b9769776" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "MaterialAssignment" DROP COLUMN "open_assignment_ts"`);
        await queryRunner.query(`ALTER TABLE "MaterialAssignment" DROP COLUMN "close_assignment_ts"`);
        await queryRunner.query(`ALTER TABLE "TrainingSession" DROP COLUMN "start_day"`);
        await queryRunner.query(`ALTER TABLE "TrainingSession" DROP COLUMN "duration_day"`);
        await queryRunner.query(`ALTER TABLE "SessionMaterial" DROP COLUMN "start_seconds"`);
        await queryRunner.query(`ALTER TABLE "MaterialAssignment" ADD "deadline" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "TrainingSession" ADD "duration_seconds" integer`);
        await queryRunner.query(`ALTER TABLE "Training" ADD "duration_seconds" integer`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSession" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "SessionMaterial" ALTER COLUMN "duration_seconds" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "SessionMaterial" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Quiz" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Voucher" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "profile_picture_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "phone_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Trainer" ALTER COLUMN "profile_picture_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Trainer" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Training" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Library" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Admin" ALTER COLUMN "profile_picture_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingCompetency" ADD CONSTRAINT "FK_9fe8dadb6bc196cb362931b70aa" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrainingCompetency" DROP CONSTRAINT "FK_9fe8dadb6bc196cb362931b70aa"`);
        await queryRunner.query(`ALTER TABLE "Admin" ALTER COLUMN "profile_picture_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Library" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Training" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Trainer" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Trainer" ALTER COLUMN "profile_picture_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "phone_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "profile_picture_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Voucher" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Quiz" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "SessionMaterial" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "SessionMaterial" ALTER COLUMN "duration_seconds" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSession" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Training" DROP COLUMN "duration_seconds"`);
        await queryRunner.query(`ALTER TABLE "TrainingSession" DROP COLUMN "duration_seconds"`);
        await queryRunner.query(`ALTER TABLE "MaterialAssignment" DROP COLUMN "deadline"`);
        await queryRunner.query(`ALTER TABLE "SessionMaterial" ADD "start_seconds" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSession" ADD "duration_day" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSession" ADD "start_day" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "MaterialAssignment" ADD "close_assignment_ts" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "MaterialAssignment" ADD "open_assignment_ts" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP TABLE "TrainingCompetency"`);
        await queryRunner.query(`ALTER TABLE "TrainingLocation" RENAME COLUMN "location" TO "city_name"`);
    }

}
