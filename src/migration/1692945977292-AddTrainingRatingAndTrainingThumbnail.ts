import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTrainingRatingAndTrainingThumbnail1692945977292 implements MigrationInterface {
    name = 'AddTrainingRatingAndTrainingThumbnail1692945977292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TrainingRating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer, "training_id" integer, CONSTRAINT "PK_1b32e5a537568d75aebaa0e4b56" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Training" ADD "thumbnail" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "TrainingRating" ADD CONSTRAINT "FK_ff9c7e1ee892ee0c8f41627d614" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TrainingRating" ADD CONSTRAINT "FK_b2ebac3accef538280d2ddaa77e" FOREIGN KEY ("training_id") REFERENCES "Training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TrainingRating" DROP CONSTRAINT "FK_b2ebac3accef538280d2ddaa77e"`);
        await queryRunner.query(`ALTER TABLE "TrainingRating" DROP CONSTRAINT "FK_ff9c7e1ee892ee0c8f41627d614"`);
        await queryRunner.query(`ALTER TABLE "Training" DROP COLUMN "thumbnail"`);
        await queryRunner.query(`DROP TABLE "TrainingRating"`);
    }

}
