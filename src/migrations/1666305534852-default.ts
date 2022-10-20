import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666305534852 implements MigrationInterface {
    name = 'default1666305534852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`validate\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`closedOrders\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`openOrders\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`broker\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`multpInsider\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`validateInsider\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`multpExplicitus\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`passBroker\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`validateExplicitus\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`multpPoupDobrada\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`validatePoupDobrada\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`closedOrdersInsider\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`closedOrdersExplicitus\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`closedOrdersPoupDobrada\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`openOrdersInsider\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`openOrdersExplicitus\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`openOrdersPoupDobrada\` float NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`openOrdersPoupDobrada\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`openOrdersExplicitus\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`openOrdersInsider\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`closedOrdersPoupDobrada\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`closedOrdersExplicitus\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP COLUMN \`closedOrdersInsider\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`validatePoupDobrada\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`multpPoupDobrada\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`validateExplicitus\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`passBroker\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`multpExplicitus\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`validateInsider\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`multpInsider\``);
        await queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`broker\``);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`openOrders\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD \`closedOrders\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`validate\` datetime NOT NULL`);
    }

}
