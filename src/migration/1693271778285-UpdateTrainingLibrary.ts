import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTrainingLibrary1693271778285 implements MigrationInterface {
    name = 'UpdateTrainingLibrary1693271778285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP CONSTRAINT "FK_869fe69952099985a125515ccce"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP CONSTRAINT "FK_79d2d1db326bde4a74922832b0f"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP COLUMN "next_training_session_id"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP COLUMN "next_session_material_id"`);
        await queryRunner.query(`ALTER TABLE "Library" ADD "training_id" integer`);
        await queryRunner.query(`ALTER TABLE "Library" ADD CONSTRAINT "FK_39ea12b0dcff513172d9e894e2b" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Library" DROP CONSTRAINT "FK_39ea12b0dcff513172d9e894e2b"`);
        await queryRunner.query(`ALTER TABLE "Library" DROP COLUMN "training_id"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD "next_session_material_id" integer`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD "next_training_session_id" integer`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD CONSTRAINT "FK_79d2d1db326bde4a74922832b0f" FOREIGN KEY ("next_session_material_id") REFERENCES "SessionMaterial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD CONSTRAINT "FK_869fe69952099985a125515ccce" FOREIGN KEY ("next_training_session_id") REFERENCES "TrainingSession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
