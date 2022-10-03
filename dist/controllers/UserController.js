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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const api_errors_1 = require("../helpers/api-errors");
const UserRepository_1 = require("../repositories/UserRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, account, ativated, validate } = req.body;
            const userExists = yield UserRepository_1.userRepository.findOneBy({ email });
            if (userExists) {
                throw new api_errors_1.BadRequestError("E-mail já cadastrado");
            }
            const hashPass = yield bcrypt_1.default.hash(password, 10);
            const newUser = UserRepository_1.userRepository.create({
                name,
                email,
                account,
                password: hashPass,
                administrator: "N",
                ativated,
                validate
            });
            yield UserRepository_1.userRepository.save(newUser);
            const { password: _, customer } = newUser;
            return res.status(201).json(customer);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield UserRepository_1.userRepository.findOneBy({ id: Number(id) });
            if (!user) {
                throw new api_errors_1.BadRequestError("Usuário não encontrado.");
            }
            const { password: _ } = user, customer = __rest(user, ["password"]);
            return res.json(customer);
        });
    }
    getByAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const { account } = req.params;
            const user = yield UserRepository_1.userRepository.findOneBy({ account: Number(account) });
            if (!user) {
                throw new api_errors_1.BadRequestError("Usuário não encontrado.");
            }
            if (user.ativated == "N") {
                throw new api_errors_1.BadRequestError("Usuário bloqueado, fale com o suporte");
            }
            if (today > user.validate) {
                throw new api_errors_1.BadRequestError("Licença vencida, fale com o suporte");
            }
            console.log(account);
            return res.json({ "message": user.validate });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserRepository_1.userRepository.find();
            if (!users) {
                throw new api_errors_1.BadRequestError("Nenhum usuário encontrado");
            }
            return res.json(users);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email, account, validate, ativated, administrator } = req.body;
            const user = yield UserRepository_1.userRepository.findOneBy({ id: Number(id) });
            if (!user) {
                throw new api_errors_1.BadRequestError("Nenhum usuário encontrado");
            }
            yield UserRepository_1.userRepository.update(parseInt(id), { name, email, account, validate, ativated, administrator });
            return res.send();
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepository_1.userRepository.findOneBy({ id: Number(req.params.id) });
            if (!user) {
                throw new api_errors_1.BadRequestError("Usuário não encontrado");
            }
            yield UserRepository_1.userRepository.remove(user);
            return res.send();
        });
    }
}
exports.UserController = UserController;
