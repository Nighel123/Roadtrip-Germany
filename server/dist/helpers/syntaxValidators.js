"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateSyntaxValidator = exports.emailSyntaxValidator = exports.userNameSyntaxValidator = exports.passwordSyntaxValidator = void 0;
const common_1 = require("common");
const password_validator_1 = __importDefault(require("password-validator"));
const transform = (res, options) => {
    if (res.length === 0) {
        return true;
    }
    const res2 = res.map((res) => {
        if (typeof res.message === "string") {
            return res.message;
        }
    });
    if (res2.every((i) => typeof i === "string")) {
        const res3 = res2.join(", ");
        if (options) {
            const { beginning, end } = options;
            const res4 = beginning + res3 + end;
            return res4;
        }
        return res3;
    }
    return `something went wrong res: ${res.toString()}`;
};
const passwordSyntaxValidator = (password) => {
    const schema = new password_validator_1.default();
    schema
        .is()
        .min(8, "mindestens 8 Zeichen")
        .is()
        .max(100, "nicht mehr als 100 Zeichen")
        .has()
        .uppercase(1, "mindesten einen Großbuchstaben")
        .has()
        .lowercase(1, "mindesten einen Kleinbuchstaben")
        .has()
        .digits(1, "mindesten eine Zahl")
        .has()
        .not()
        .spaces(0, "keine Leerzeichen")
        .is()
        .not()
        .oneOf(["Passw0rd", "Password123"], 'sollte nicht einfach, z.B. "Passw0rd" oder "Password123"');
    const res = schema.validate(password, { details: true });
    return transform(res, {
        beginning: "Das Passwort sollte ",
        end: " enthalten",
    });
};
exports.passwordSyntaxValidator = passwordSyntaxValidator;
const userNameSyntaxValidator = (userName) => {
    const schema = new password_validator_1.default();
    schema
        .is()
        .min(4, "Der Benutzername sollte mindestens 4 Zeichen enthalten")
        .is()
        .max(100, "Der Benutzername sollte nicht mehr als 100 Zeichen enthalten");
    const res = schema.validate(userName, { details: true });
    return transform(res);
};
exports.userNameSyntaxValidator = userNameSyntaxValidator;
const emailSyntaxValidator = (email) => {
    const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    if (isValid)
        return isValid;
    return "Bitte gebe eine echte Email Adresse ein.";
};
exports.emailSyntaxValidator = emailSyntaxValidator;
const dateSyntaxValidator = (day, month, year) => {
    if (!common_1.months.includes(month)) {
        return "Bitte einen Monat mit dem Wert Januar, Februar, März, Apirl, Mai, Juni, Juli, August, September, Oktovber, November oder Dezember eingeben.";
    }
    const monthNumber = (0, common_1.monthToNumber)(month);
    const date = `${year}/${monthNumber}/${day}`;
    const isValid = !isNaN(Number(new Date(date)));
    if (isValid)
        return isValid;
    return "Bitte gebe ein gültiges Datum ein.";
};
exports.dateSyntaxValidator = dateSyntaxValidator;
//# sourceMappingURL=syntaxValidators.js.map