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
exports.OrderController = void 0;
const api_errors_1 = require("../helpers/api-errors");
const OrderRepository_1 = require("../repositories/OrderRepository");
class OrderController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { symbol, ticket, entry, takeProfit, stopLoss, typeOrder, lote, status, date, operationType } = req.body;
            const order = OrderRepository_1.orderRepository.create({
                symbol,
                ticket,
                entry,
                takeProfit,
                stopLoss,
                typeOrder,
                lote,
                status,
                date,
                operationType
            });
            yield OrderRepository_1.orderRepository.save(order);
            res.json(order);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const order = yield OrderRepository_1.orderRepository.findOneBy({ id: Number(id) });
            if (!order) {
                throw new api_errors_1.BadRequestError("Ordem não encontrada");
            }
            return res.json(order);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield OrderRepository_1.orderRepository.find();
            if (!orders) {
                throw new api_errors_1.BadRequestError("Nenhum ordem encontrada");
            }
            return res.json(orders);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const order = yield OrderRepository_1.orderRepository.findOneBy({ id: Number(id) });
            if (!order) {
                throw new api_errors_1.BadRequestError("Ordem não encontrada");
            }
            yield OrderRepository_1.orderRepository.remove(order);
            res.send();
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { symbol, ticket, entry, takeProfit, stopLoss, typeOrder, lote, status, date, operationType } = req.body;
            const order = yield OrderRepository_1.orderRepository.findOneBy({ id: Number(id) });
            if (!order) {
                throw new api_errors_1.BadRequestError("Ordem não encontrada");
            }
            yield OrderRepository_1.orderRepository.update(Number(id), {
                symbol,
                ticket,
                entry,
                takeProfit,
                stopLoss,
                typeOrder,
                lote,
                status,
                date,
                operationType
            });
            return res.send();
        });
    }
}
exports.OrderController = OrderController;
