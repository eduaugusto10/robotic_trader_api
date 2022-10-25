import { Request, Response } from "express"
import { BadRequestError } from "../helpers/api-errors"
import { userRepository } from "../repositories/UserRepository"
import { randomBytes } from 'crypto'
import bcrypt from 'bcrypt'
import { transport } from "../utils/Email/mailer"

export class UserPassController {
    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body
        const user = await userRepository.findOneBy({ email })

        if (!user) {
            throw new BadRequestError('E-mail não encontrado')
        }

        const token = randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)
        await userRepository.update(user.id, {
            passwordResetToken: token,
            passwordResetExpires: now
        })

        transport.sendMail({
            to: email,
            from: 'eduaugusto10@gmail.com',
            subject: 'Alteração de senha - Robotic Trader',
            text: "Plaintext version of the message",
            html: `<html lang="pt-BR">
            <head>
              <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Alteração de senha - Robotic Trader</title>
            </head>
            <body
              style="
                font-family: Montserrat;
                width: 100%;
                display: flex;
                flex-direction: column;
                text-align: center;
                align-items: center;
              "
            >
              <div style="background-color: #000; width: 100%; height: 150px"></div>
              <h2 style="text-decoration: underline;">Alteração de Senha</h2>
              <div style="width: 100%; display: flex; flex-direction: column; text-align: left">
                <p1>Olá, ${user.name}</p1>
                <br />
                <p1>Você pediu para alterar sua senha!</p1>
              </div>
              <a href="http://localhost:3000/reset/${user.email}/${token}" style="background-color: #c4c4c4;width: 300px; height: 60px; border-radius: 10px; margin: 30px; font-size: 18px; border: none">
                Clique aqui para alterar
              </a>
              <div style="width: 100%; display: flex; flex-direction: column; text-align: left">
                <p1>Caso não tenha pedido a alteração, desconsidere.</p1>
                <br />
                <br />
                <br />
                <p1>Saudações,</p1>
                <p1>Equipe Robotic Trader</p1>
                <a style="padding-bottom: 10px" href="https://robotictrader.online/"
                  >https://robotictrader.online/</a
                >
              </div>
              <div
                style="
                  font-size: 13px;
                  padding: 10px;
                  text-align: left;
                  display: flex;
                  flex-direction: column;
                  background-color: #000;
                  width: 100%;
                  height: 150px;
                "
              >
                <p1 style="color: #c4c4c4">Robotic Trader</p1>
                <p1 style="color: #c4c4c4">Telefone: (99)99999-9999</p1>
                <p1 style="color: #c4c4c4">E-mail: teste@teste.com</p1>
              </div>
            </body>
          </html>
          `,
        }, (error: any) => {
            console.log(error)
        })
        return res.send()
    }

    async passwordReset(req: Request, res: Response) {
        const { email, token, password } = req.body
        const now = new Date()

        const user = await userRepository.createQueryBuilder()
            .select('passwordResetToken')
            .addSelect('passwordResetExpires')
            .where("email=:email", { email })
            .getRawMany()

        if (!user) {
            throw new BadRequestError('Usuário não encontrado')
        }

        if (token !== user[0].passwordResetToken) {
            throw new BadRequestError('Usuário não encontrado')
        }
        if (now > user[0].passwordResetExpires) {
            throw new BadRequestError('Usuário não encontrado')
        }
        const hashPass = await bcrypt.hash(password, 10)

        await userRepository.update({ email }, { password: hashPass })

        return res.json({ "message": "Senha alterada com sucesso" })
    }
}