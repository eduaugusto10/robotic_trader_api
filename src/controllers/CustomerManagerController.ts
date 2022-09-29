import { Request, Response } from "express";
import { BadRequestError, PaymentRequireError } from "../helpers/api-errors";
import { customerManagerRepository } from "../repositories/CustomerManagerRepository";
import { userRepository } from "../repositories/UserRepository";

export class CustomerManagerController {
    async store(req: Request, res: Response) {
        const { balance, date, id } = req.body

        const user = await userRepository.findOneBy({ id })
        if (!user) {
            throw new BadRequestError('Usuário não encontrado')
        }
        if (user.ativated === "N") {
            throw new PaymentRequireError('Conta desativada, entre em contato conosco')
        }

        const order = customerManagerRepository.create({
            id,
            balance,
            date
        })

        await customerManagerRepository.save(order)

        res.status(200).json(order)
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        const balance = await customerManagerRepository
            .createQueryBuilder()
            .select("sum(balance)", "balance")
            .addSelect("MONTH(date)","month")
            .addSelect("Year(date)","year")
            .where("userId = :id", { id })
            .andWhere("date > (now() - INTERVAL 12 month)")
            .groupBy("MONTH(date)")
            .orderBy("date", "ASC")
            .getRawMany()

        if (!balance) {
            throw new BadRequestError("Nenhuma ordem encontrada")
        }

        res.send(balance)
    }

    async getAll(req: Request, res: Response) {

    }

    async delete(req: Request, res: Response) {

    }

    async update(req: Request, res: Response) {

    }
}
