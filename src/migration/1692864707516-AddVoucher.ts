import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVoucher1692864707516 implements MigrationInterface {
    name = 'AddVoucher1692864707516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Voucher" ("id" SERIAL NOT NULL, "code" character varying(255) NOT NULL, "description" text NOT NULL, "quota" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_27e642ace1848e154866e807c58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "VoucherUser" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "voucher_id" integer, "user_id" integer, CONSTRAINT "PK_5c325a69fbfa4ec8945a4da5f68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" ADD "redeem_voucher_code" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "VoucherUser" ADD CONSTRAINT "FK_d22b301e647014a81fce46df245" FOREIGN KEY ("voucher_id") REFERENCES "Voucher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "VoucherUser" ADD CONSTRAINT "FK_4c7ac710972b17929f6bf78e635" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VoucherUser" DROP CONSTRAINT "FK_4c7ac710972b17929f6bf78e635"`);
        await queryRunner.query(`ALTER TABLE "VoucherUser" DROP CONSTRAINT "FK_d22b301e647014a81fce46df245"`);
        await queryRunner.query(`ALTER TABLE "UserTrainingSchedule" DROP COLUMN "redeem_voucher_code"`);
        await queryRunner.query(`DROP TABLE "VoucherUser"`);
        await queryRunner.query(`DROP TABLE "Voucher"`);
    }

}
