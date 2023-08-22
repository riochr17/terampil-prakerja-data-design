import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdmin1692676756382 implements MigrationInterface {
    name = 'AddAdmin1692676756382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Admin" ("id" SERIAL NOT NULL, "fullname" character varying(255) NOT NULL, "profile_picture_url" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3a489f4a44372ff150d7924dc3d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Admin"`);
    }

}
