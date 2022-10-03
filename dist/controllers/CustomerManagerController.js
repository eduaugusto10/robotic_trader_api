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
exports.CustomerManagerController = void 0;
const api_errors_1 = require("../helpers/api-errors");
const CustomerManagerRepository_1 = require("../repositories/CustomerManagerRepository");
const UserRepository_1 = require("../repositories/UserRepository");
class CustomerManagerController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { balance, date, id } = req.body;
            const user = yield UserRepository_1.userRepository.findOneBy({ id });
            if (!user) {
                throw new api_errors_1.BadRequestError('Usuário não encontrado');
            }
            if (user.ativated === "N") {
                throw new api_errors_1.PaymentRequireError('Conta desativada, entre em contato conosco');
            }
            const order = CustomerManagerRepository_1.customerManagerRepository.create({
                customer: id,
                balance,
                date
            });
            yield CustomerManagerRepository_1.customerManagerRepository.save(order);
            res.status(200).json(order);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const balance = yield CustomerManagerRepository_1.customerManagerRepository
                .createQueryBuilder()
                .select("sum(balance)", "balance")
                .addSelect("MONTH(date)", "month")
                .addSelect("Year(date)", "year")
                .where("customerId = :id", { id })
                .andWhere("date > (now() - INTERVAL 12 month)")
                .groupBy("MONTH(date)")
                .orderBy("date", "ASC")
                .getRawMany();
            if (!balance) {
                throw new api_errors_1.BadRequestError("Nenhuma ordem encontrada");
            }
            res.send(balance);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const balanceTotal = yield CustomerManagerRepository_1.customerManagerRepository
                .createQueryBuilder()
                .select("sum(balance)", "balance")
                .addSelect("Month(date)", "month")
                .addSelect("Year(date)", "year")
                .where("date > (now() - INTERVAL 12 month)")
                .groupBy("MONTH(date)")
                .orderBy("date", "ASC")
                .getRawMany();
            if (!balanceTotal) {
                throw new api_errors_1.BadRequestError("Nenhuma ordem encontrada");
            }
            res.send(balanceTotal);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CustomerManagerController = CustomerManagerController;
