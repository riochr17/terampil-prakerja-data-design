import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTrainingRating1693273100325 implements MigrationInterface {
    name = 'UpdateTrainingRating1693273100325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrainingRating" ADD "notes" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrainingRating" DROP COLUMN "notes"`);
    }

}
