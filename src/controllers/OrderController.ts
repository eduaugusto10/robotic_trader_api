import { Request, Response } from "express";
import { orderRepository } from "../repositories/OrderRepository";

export class OrderController {
    async store(req: Request, res: Response) {
        const {
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
        } = req.body

        const order = orderRepository.create({
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
        })

        await orderRepository.save(order)

        res.json(order)
    }
    async getById(req: Request, res: Response) {
        
     }
    async getAll(req: Request, res: Response) { }
    async delete(req: Request, res: Response) { }
    async update(req: Request, res: Response) { }
}
