import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTrainingProgressAndStatr1693186305538 implements MigrationInterface {
    name = 'FixTrainingProgressAndStatr1693186305538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD "progress" double precision`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD "current_session_material_id" integer`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD "next_session_material_id" integer`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD "current_training_session_id" integer`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD "next_training_session_id" integer`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD CONSTRAINT "FK_c4c35884eee23f81106ebfe1d92" FOREIGN KEY ("current_session_material_id") REFERENCES "SessionMaterial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD CONSTRAINT "FK_79d2d1db326bde4a74922832b0f" FOREIGN KEY ("next_session_material_id") REFERENCES "SessionMaterial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD CONSTRAINT "FK_cfb6d699103f998b8f2b7cf07a7" FOREIGN KEY ("current_training_session_id") REFERENCES "TrainingSession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD CONSTRAINT "FK_869fe69952099985a125515ccce" FOREIGN KEY ("next_training_session_id") REFERENCES "TrainingSession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP CONSTRAINT "FK_869fe69952099985a125515ccce"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP CONSTRAINT "FK_cfb6d699103f998b8f2b7cf07a7"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP CONSTRAINT "FK_79d2d1db326bde4a74922832b0f"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP CONSTRAINT "FK_c4c35884eee23f81106ebfe1d92"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP COLUMN "next_training_session_id"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP COLUMN "current_training_session_id"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP COLUMN "next_session_material_id"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP COLUMN "current_session_material_id"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP COLUMN "progress"`);
    }

}
