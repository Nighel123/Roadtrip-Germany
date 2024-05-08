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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.register = exports.login = exports.logout = void 0;
const User_1 = require("../../models/User");
const common_1 = require("common");
const helpers_1 = require("../helpers");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield User_1.User.findOne({ userName: body.userName });
        if (!user) {
            (0, helpers_1.response)(res, 202, "Dieses Benutzernamen gibt es nicht.");
            return;
        }
        let { userName, email, birthday, sex, _id } = user;
        const passwordMatch = yield bcryptjs_1.default.compare(body.password, user === null || user === void 0 ? void 0 : user.password);
        if (passwordMatch) {
            if (req.session.userId) {
                (0, helpers_1.response)(res, 200, {
                    message: "Du bist bereits eingeloggt.",
                    user: { userName, email, birthday, sex, _id },
                });
                return;
            }
            req.session.userId = String(user._id);
            yield req.session.save();
            (0, helpers_1.response)(res, 200, {
                message: "Du bist erfolgreich eingeloggt.",
                user: { userName, email, birthday, sex, _id },
            });
        }
        else {
            (0, helpers_1.response)(res, 202, "Das Passwort stimmt nicht.");
        }
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.session;
    if (userId) {
        const user = yield User_1.User.findOne({ _id: userId });
        if (user) {
            let { userName, email, birthday, sex, _id } = user;
            (0, helpers_1.response)(res, 200, {
                message: "OK",
                user: { userName, email, birthday, sex, _id },
            });
        }
        else {
            (0, helpers_1.response)(res, 204, "Kein Nutzer mit diesem Username.");
        }
    }
    else {
        (0, helpers_1.response)(res, 204, "Du bist nicht eingeloggt.");
    }
});
exports.me = me;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy((error) => {
            var _a;
            if (error) {
                console.log("destroying the session failed.", error);
                return;
            }
            console.log("session destroyed!", (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId);
        });
    }
    catch (ex) {
        throw ex;
    }
});
exports.logout = logout;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password, email, sex, day, month, year } = req.body;
        const salt = yield bcryptjs_1.default.genSalt(saltRounds);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const monthNumber = (0, common_1.monthToNumber)(month);
        const date = `${year}/${monthNumber}/${day}`;
        const newUser = yield new User_1.User({
            userName: userName,
            password: hashedPassword,
            email: email,
            birthday: new Date(date),
            sex: sex,
        }).save();
        (0, helpers_1.response)(res, 201, {
            message: "Der User wurde erfolgreich erstellt.",
            user: newUser,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.register = register;
//# sourceMappingURL=crud.js.map