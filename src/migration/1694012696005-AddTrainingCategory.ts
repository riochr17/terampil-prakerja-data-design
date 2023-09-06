import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTrainingCategory1694012696005 implements MigrationInterface {
    name = 'AddTrainingCategory1694012696005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Category" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Training" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "Training" ADD CONSTRAINT "FK_ee35cdafc703b186116f50cb153" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Training" DROP CONSTRAINT "FK_ee35cdafc703b186116f50cb153"`);
        await queryRunner.query(`ALTER TABLE "Training" DROP COLUMN "category_id"`);
        await queryRunner.query(`DROP TABLE "Category"`);
    }

}
