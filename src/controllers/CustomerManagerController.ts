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
            customer: id,
            balance,
            date
        })

        await customerManagerRepository.save(order)

        res.status(200).json(order)
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        const balance = await customerManagerRepository.findTwelveMonthsById(Number(id))
        if (!balance) {
            throw new BadRequestError("Nenhuma ordem encontrada")
        }

        res.send(balance)
    }

    async getAll(req: Request, res: Response) {
        const balanceTotal = await customerManagerRepository.findTwelveMonths()

        if (!balanceTotal) {
            throw new BadRequestError("Nenhuma ordem encontrada")
        }

        res.send(balanceTotal)
    }

    async delete(req: Request, res: Response) {

    }

    async update(req: Request, res: Response) {

    }

    async createOrUpdate(req: Request, res: Response) {
        const { account } = req.params
        const {
            balance,
            date,
            balanceToday,
            closedOrdersInsider,
            closedOrdersExplicitus,
            closedOrdersPoupDobrada,
            openOrdersInsider,
            openOrdersExplicitus,
            openOrdersPoupDobrada, accountBalance } = req.body

        const user
            = await userRepository.createQueryBuilder()
                .select("*")
                .where("account=:account", { account })
                .getRawMany()

        if (!user) {
            throw new BadRequestError('Usuário não encontrado')
        }

        const dates = date.replaceAll(".", "-")

        const balanceMonth = await customerManagerRepository.createQueryBuilder()
            .select("*")
            .where("Month(now())=Month(date)")
            .andWhere("customerId = :id", { id: user[0].id })
            .getRawMany()


        if (balanceMonth.length == 0) {
            const newBalance = customerManagerRepository.create({
                customer: user[0].id,
                balance,
                balanceToday,
                accountBalance,
                closedOrdersInsider,
                closedOrdersExplicitus,
                closedOrdersPoupDobrada,
                openOrdersInsider,
                openOrdersExplicitus,
                openOrdersPoupDobrada,
                date: dates
            })

            await customerManagerRepository.save(newBalance)

            return res.status(200).json(newBalance)
        }
        const newBalance = customerManagerRepository.update({ id: balanceMonth[0].id }, {
            balance,
            balanceToday,
            closedOrdersInsider,
            closedOrdersExplicitus,
            closedOrdersPoupDobrada,
            openOrdersInsider,
            openOrdersExplicitus,
            openOrdersPoupDobrada,
            accountBalance,
            date: dates,
            customer: user[0].id
        })
        return res.json(newBalance)
    }
}
