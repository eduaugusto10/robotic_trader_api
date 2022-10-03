"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1664584620446 = void 0;
class default1664584620446 {
    constructor() {
        this.name = 'default1664584620446';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`tbcustomerorders\` DROP FOREIGN KEY \`FK_756e09f144f920a71b38f9c272e\``);
            yield queryRunner.query(`ALTER TABLE \`tbcustomerorders\` CHANGE \`customerOrderId\` \`customerOrderId\` int NULL`);
            yield queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`validate\``);
            yield queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`validate\` datetime NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP FOREIGN KEY \`FK_566f85ed132d9ad6bf62d592325\``);
            yield queryRunner.query(`ALTER TABLE \`tbcustomermanager\` CHANGE \`customerId\` \`customerId\` int NULL`);
            yield queryRunner.query(`ALTER TABLE \`tbcustomerorders\` ADD CONSTRAINT \`FK_756e09f144f920a71b38f9c272e\` FOREIGN KEY (\`customerOrderId\`) REFERENCES \`tbuser\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD CONSTRAINT \`FK_566f85ed132d9ad6bf62d592325\` FOREIGN KEY (\`customerId\`) REFERENCES \`tbuser\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`tbcustomermanager\` DROP FOREIGN KEY \`FK_566f85ed132d9ad6bf62d592325\``);
            yield queryRunner.query(`ALTER TABLE \`tbcustomerorders\` DROP FOREIGN KEY \`FK_756e09f144f920a71b38f9c272e\``);
            yield queryRunner.query(`ALTER TABLE \`tbcustomermanager\` CHANGE \`customerId\` \`customerId\` int NULL DEFAULT 'NULL'`);
            yield queryRunner.query(`ALTER TABLE \`tbcustomermanager\` ADD CONSTRAINT \`FK_566f85ed132d9ad6bf62d592325\` FOREIGN KEY (\`customerId\`) REFERENCES \`tbuser\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`tbuser\` DROP COLUMN \`validate\``);
            yield queryRunner.query(`ALTER TABLE \`tbuser\` ADD \`validate\` date NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`tbcustomerorders\` CHANGE \`customerOrderId\` \`customerOrderId\` int NULL DEFAULT 'NULL'`);
            yield queryRunner.query(`ALTER TABLE \`tbcustomerorders\` ADD CONSTRAINT \`FK_756e09f144f920a71b38f9c272e\` FOREIGN KEY (\`customerOrderId\`) REFERENCES \`tbuser\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.default1664584620446 = default1664584620446;
