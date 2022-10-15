import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import { customerManagerRepository } from "../repositories/CustomerManagerRepository";

export class UserController {
    async store(req: Request, res: Response) {
        const {
            name,
            email,
            password,
            account,
            ativated,
            phone,
            administrator,
            multpInsider,
            validateInsider,
            multpExplicitus,
            validateExplicitus,
            multpPoupDobrada,
            validatePoupDobrada,
            description,
            broker,
            passBroker } = req.body

        const userExists = await userRepository.findOneBy({ email })

        if (userExists) {
            throw new BadRequestError("E-mail já cadastrado")
        }

        const hashPass = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name,
            email,
            account,
            phone,
            password: hashPass,
            administrator,
            ativated,
            broker,
            multpInsider,
            validateInsider,
            multpExplicitus,
            validateExplicitus,
            multpPoupDobrada,
            validatePoupDobrada,
            description,
            passBroker
        })

        await userRepository.save(newUser)
        const { password: _, customer } = newUser
        return res.status(201).json(customer)

    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        const user = await userRepository.findOneBy({ id: Number(id) })

        if (!user) {
            throw new BadRequestError("Usuário não encontrado.")
        }
        const { password: _, ...customer } = user
        return res.json(customer)

    }
    async getByAccount(req: Request, res: Response) {
        const today = new Date()
        const { account } = req.params
        const user = await userRepository.findOneBy({ account: Number(account) })

        if (!user) {
            throw new BadRequestError("Usuário não encontrado.")
        }
        if (user.ativated == "N") {
            throw new BadRequestError("Usuário bloqueado, fale com o suporte")
        }
 
        return res.json({ "message": "Usuario liberado" })
    }

    async getAll(req: Request, res: Response) {
        const users = await userRepository.find()
        if (!users) {
            throw new BadRequestError("Nenhum usuário encontrado")
        }
        for (let i = 0; i < users.length; i++) {
            const balanceUser = await customerManagerRepository.findBalanceById(users[i].id)
            if (balanceUser.length > 0) {
                const newBalances = {
                    "balance": balanceUser[0].balance,
                    "balanceToday": balanceUser[0].balanceToday
                }

                users[i] = { ...users[i], ...newBalances }
            }
        }
        return res.json(users)
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const {
            name,
            email,
            account,
            phone,
            ativated,
            administrator,
            multpInsider,
            validateInsider,
            multpExplicitus,
            validateExplicitus,
            multpPoupDobrada,
            validatePoupDobrada,
            description,
            broker,
            passBroker } = req.body

        const user = await userRepository.findOneBy({ id: Number(id) })
        if (!user) {
            throw new BadRequestError("Nenhum usuário encontrado")
        }
        await userRepository.update(parseInt(id), {
            name,
            email,
            account,
            phone,
            ativated,
            administrator,
            multpInsider,
            validateInsider,
            multpExplicitus,
            validateExplicitus,
            multpPoupDobrada,
            validatePoupDobrada,
            description,
            broker,
            passBroker
        })

        return res.send()
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params
        const user = await userRepository.findOneBy({ id: Number(id) })

        if (!user) {
            throw new BadRequestError("Usuário não encontrado")
        }
        await userRepository.remove(user)

        return res.send()
    }
}