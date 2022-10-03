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
exports.CustomerManagerEntity = void 0;
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("./UserEntity");
let CustomerManagerEntity = class CustomerManagerEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CustomerManagerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], CustomerManagerEntity.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], CustomerManagerEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserEntity_1.UserEntity, (user) => user.customer),
    __metadata("design:type", UserEntity_1.UserEntity)
], CustomerManagerEntity.prototype, "customer", void 0);
CustomerManagerEntity = __decorate([
    (0, typeorm_1.Entity)('tbcustomermanager')
], CustomerManagerEntity);
exports.CustomerManagerEntity = CustomerManagerEntity;
