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
exports.loggedInValidator = exports.descriptionValidator = exports.addressValidator = exports.dateValidator = exports.passwordValidator = exports.userNameValidator = exports.emailValidator = void 0;
const User_1 = require("../../models/User");
const syntaxValidators_1 = require("../../helpers/syntaxValidators");
const helpers_1 = require("../helpers");
const emailValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const isValid = (0, syntaxValidators_1.emailSyntaxValidator)(email);
    if (isValid !== true) {
        (0, helpers_1.response)(res, 202, isValid);
        return;
    }
    try {
        const user = yield User_1.User.findOne({ email: email });
        if (user) {
            (0, helpers_1.response)(res, 202, "Diese Email existiert bereits.");
            return;
        }
    }
    catch (error) {
        throw error;
    }
    next();
});
exports.emailValidator = emailValidator;
const userNameValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.body;
    const isValid = (0, syntaxValidators_1.userNameSyntaxValidator)(userName);
    if (isValid !== true) {
        (0, helpers_1.response)(res, 202, isValid);
        return;
    }
    try {
        const user = yield User_1.User.findOne({ userName: userName });
        if (user) {
            (0, helpers_1.response)(res, 202, "Dieser Nutzername existiert bereits.");
            return;
        }
    }
    catch (error) {
        throw error;
    }
    next();
});
exports.userNameValidator = userNameValidator;
const passwordValidator = (req, res, next) => {
    const { password } = req.body;
    const isValid = (0, syntaxValidators_1.passwordSyntaxValidator)(password);
    if (isValid !== true) {
        (0, helpers_1.response)(res, 202, isValid);
        return;
    }
    next();
};
exports.passwordValidator = passwordValidator;
const dateValidator = (req, res, next) => {
    const { day, month, year } = req.body;
    const isValid = (0, syntaxValidators_1.dateSyntaxValidator)(day, month, year);
    if (isValid !== true) {
        (0, helpers_1.response)(res, 202, isValid);
        return;
    }
    next();
};
exports.dateValidator = dateValidator;
const addressValidator = (req, res, next) => {
    const testAddress = ({ town, land, add = "", }) => {
        if (2 > town.length || town.length > 60) {
            (0, helpers_1.response)(res, 202, `Bitte gebe eine Stadt mit mindestens zwei und maximal 60 Buchstaben ein${add ? add : "."}`);
            return false;
        }
        if (2 > land.length || land.length > 60) {
            (0, helpers_1.response)(res, 202, `Bitte gebe ein Land mit mindestens zwei und maximal 60 Buchstaben ein${add ? add : "."}`);
            return false;
        }
        return true;
    };
    if (req.body.startLand === undefined || req.body.startTown === undefined) {
        const { town, land } = req.body;
        const valid = testAddress({ town, land });
        if (!valid) {
            return;
        }
    }
    else {
        const { startLand, startTown } = req.body;
        const validStart = testAddress({
            land: startLand,
            town: startTown,
            add: ", in der du starten möchtest.",
        });
        if (!validStart) {
            return;
        }
        const { destTown, destLand } = req.body;
        const validDest = testAddress({
            town: destTown,
            land: destLand,
            add: ", in dem du starten möchtest.",
        });
        if (!validDest) {
            return;
        }
    }
    next();
};
exports.addressValidator = addressValidator;
const descriptionValidator = (req, res, next) => {
    const { description } = req.body;
    const min = 100, max = 5000;
    if (min > description.length) {
        (0, helpers_1.response)(res, 202, `Bitte gebe eine Beschreibung mit mindestens ${min} Buchstaben ein.`);
        return;
    }
    if (max < description.length) {
        (0, helpers_1.response)(res, 202, `Bitte gebe eine Beschreibung mit maximal ${max} Buchstaben ein.`);
        return;
    }
    next();
};
exports.descriptionValidator = descriptionValidator;
const loggedInValidator = (req, res, next) => {
    if (!req.session.userId) {
        (0, helpers_1.response)(res, 202, `Du musst dich einloggen bevor du einen Roadtrip posten kannst.`);
        return;
    }
    next();
};
exports.loggedInValidator = loggedInValidator;
//# sourceMappingURL=validators.js.map