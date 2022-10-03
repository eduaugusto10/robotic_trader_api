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
exports.CustomerOrderController = void 0;
const api_errors_1 = require("../helpers/api-errors");
const CustomerOrderRepository_1 = require("../repositories/CustomerOrderRepository");
const UserRepository_1 = require("../repositories/UserRepository");
class CustomerOrderController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { symbol, ticket, entry, takeProfit, stopLoss, typeOrder, lote, status, date, operationType, id } = req.body;
            const user = yield UserRepository_1.userRepository.findOneBy({ id });
            if (!user) {
                throw new api_errors_1.BadRequestError("Usuário não encontrado ou inativo");
            }
            const order = CustomerOrderRepository_1.customerOrderRepository.create({
                symbol,
                ticket,
                entry,
                takeProfit,
                stopLoss,
                typeOrder,
                lote,
                status,
                date,
                operationType,
                customerOrder: id
            });
            yield CustomerOrderRepository_1.customerOrderRepository.save(order);
            res.json(order);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const order = yield CustomerOrderRepository_1.customerOrderRepository.findOneBy({ id: Number(id) });
            if (!order) {
                throw new api_errors_1.BadRequestError("Ordem não encontrada");
            }
            return res.json(order);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield CustomerOrderRepository_1.customerOrderRepository.find();
            if (!orders) {
                throw new api_errors_1.BadRequestError("Nenhuma ordem encontrada");
            }
            return res.json(orders);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const order = yield CustomerOrderRepository_1.customerOrderRepository.findOneBy({ id: Number(id) });
            if (!order) {
                throw new api_errors_1.BadRequestError("Ordem não encontrada");
            }
            yield CustomerOrderRepository_1.customerOrderRepository.remove(order);
            res.send();
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { symbol, ticket, entry, takeProfit, stopLoss, typeOrder, lote, status, date, operationType, customerOrder } = req.body;
            const order = yield CustomerOrderRepository_1.customerOrderRepository.findOneBy({ id: Number(id) });
            if (!order) {
                throw new api_errors_1.BadRequestError("Ordem não encontrada");
            }
            yield CustomerOrderRepository_1.customerOrderRepository.update(Number(id), {
                symbol,
                ticket,
                entry,
                takeProfit,
                stopLoss,
                typeOrder,
                lote,
                status,
                date,
                operationType,
                customerOrder
            });
            return res.send();
        });
    }
}
exports.CustomerOrderController = CustomerOrderController;
