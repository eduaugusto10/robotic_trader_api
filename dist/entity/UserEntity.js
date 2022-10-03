"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const CustomerManagerEntity_1 = require("./CustomerManagerEntity");
const CustomerOrderEntity_1 = require("./CustomerOrderEntity");
let UserEntity = class UserEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: '100' }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: '100' }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: '100' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: '20' }),
    __metadata("design:type", String)
], UserEntity.prototype, "administrator", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: '20' }),
    __metadata("design:type", String)
], UserEntity.prototype, "ativated", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomerOrderEntity_1.CustomerOrderEntity, (customerorder) => customerorder.customerOrder),
    __metadata("design:type", Array)
], UserEntity.prototype, "customerOrder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomerManagerEntity_1.CustomerManagerEntity, (operation) => operation.customer),
    __metadata("design:type", Array)
], UserEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "validate", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('tbuser')
], UserEntity);
exports.UserEntity = UserEntity;
