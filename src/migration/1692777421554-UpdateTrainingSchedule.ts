import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTrainingSchedule1692777421554 implements MigrationInterface {
    name = 'UpdateTrainingSchedule1692777421554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "__start_date__hapus"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "__end_date__hapus"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" DROP COLUMN "__title__hapus"`);
        await queryRunner.query(`ALTER TABLE "TrainingScheduleSession" ADD "begin" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingScheduleSession" ADD "end" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrainingScheduleSession" DROP COLUMN "end"`);
        await queryRunner.query(`ALTER TABLE "TrainingScheduleSession" DROP COLUMN "begin"`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "__title__hapus" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "__end_date__hapus" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TrainingSchedule" ADD "__start_date__hapus" date NOT NULL`);
    }

}
