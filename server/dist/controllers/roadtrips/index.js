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
exports.addRoadtrip = exports.imageUpoad = exports.getRoadtrips = void 0;
const Roadtrip_1 = require("../../models/Roadtrip");
const common_1 = require("common");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const console_1 = require("console");
const User_1 = require("../../models/User");
const helpers_1 = require("../helpers");
const getRoadtrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roadtrips = yield Roadtrip_1.Roadtrip.find();
        (0, helpers_1.response)(res, 200, { roadtrips });
    }
    catch (error) {
        throw error;
    }
});
exports.getRoadtrips = getRoadtrips;
const imageUpoad = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const handleError = (message) => {
        (0, helpers_1.response)(res, 202, message);
    };
    try {
        if (!req.file) {
            (0, helpers_1.response)(res, 202, "Bitte ein Bild auswählen, dass du mit dem Roadtrip hochladen möchtest.");
            return;
        }
        const fileTypes = [".jpeg", ".jpg", ".png", ".tiff"];
        const extension = path_1.default.extname(req.file.originalname).toLowerCase();
        if (!fileTypes.includes(extension)) {
            const types = fileTypes.join(", ");
            (0, helpers_1.response)(res, 202, `Das Bild muss von einem der folgenden Typen sein: ${types}`);
            return;
        }
        const id = req.body.newRoadtrip._id.toString();
        const root = app_root_path_1.default.toString();
        const tempPath = req.file.path;
        const targetPath = path_1.default.join(root, `./imageUploads/${id}${extension}`);
        fs_1.default.rename(tempPath, targetPath, (err) => {
            if (err) {
                (0, console_1.log)(err);
                (0, helpers_1.response)(res, 202, "ein Fehler ist passiert während das Bild hochgeladen wurde.");
                return;
            }
            (0, helpers_1.response)(res, 201, "OK");
        });
    }
    catch (error) {
        throw error;
    }
});
exports.imageUpoad = imageUpoad;
const addRoadtrip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            (0, helpers_1.response)(res, 202, "Bitte ein Bild auswählen, dass du mit dem Roadtrip hochladen möchtest.");
            return;
        }
        const extension = path_1.default.extname(req.file.originalname).toLowerCase();
        const body = req.body;
        if (!req.session.userId) {
            (0, helpers_1.response)(res, 202, `Du musst dich einloggen bevor du einen Roadtrip posten kannst.`);
            return;
        }
        const user = yield User_1.User.findOne({ _id: req.session.userId });
        if (!user) {
            (0, helpers_1.response)(res, 202, "Wir konnten keinen Nutzer passend zu deiner Session-Id finden.");
            return;
        }
        const { description, startLand, startTown, destLand, destTown, day, month, year, } = body;
        const startDateGF = new Date(`${year}/${(0, common_1.monthToNumber)(month)}/${day}`);
        const roadtrip = yield new Roadtrip_1.Roadtrip({
            iniUser: user.userName,
            description: description,
            startAddress: {
                town: startTown,
                land: startLand,
            },
            destAddress: {
                town: destTown,
                land: destLand,
            },
            startDateGF: startDateGF,
            imgExt: extension,
        });
        const newRoadtrip = yield roadtrip.save();
        req.body.newRoadtrip = newRoadtrip;
        next();
    }
    catch (error) {
        throw error;
    }
});
exports.addRoadtrip = addRoadtrip;
//# sourceMappingURL=index.js.map