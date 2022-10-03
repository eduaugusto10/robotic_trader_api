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
exports.SessionController = void 0;
const api_errors_1 = require("../helpers/api-errors");
const UserRepository_1 = require("../repositories/UserRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SessionController {
    login(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield UserRepository_1.userRepository.findOneBy({ email });
            if (!user) {
                throw new api_errors_1.BadRequestError("E-mail ou senha inválida");
            }
            const verifyCryptPass = yield bcrypt_1.default.compare(password, user.password);
            if (!verifyCryptPass) {
                throw new api_errors_1.BadRequestError("E-mail ou senha inválida");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '', {
                expiresIn: '8h'
            });
            const { password: _ } = user, userLogin = __rest(user, ["password"]);
            return res.json({
                user: userLogin,
                token: token
            });
        });
    }
}
exports.SessionController = SessionController;
