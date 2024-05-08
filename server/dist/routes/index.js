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
const express_1 = require("express");
const roadtrips_1 = require("../controllers/roadtrips");
const users_1 = require("../controllers/users");
const multer_1 = __importDefault(require("multer"));
const helpers_1 = require("../controllers/helpers");
const router = (0, express_1.Router)();
router.get("/roadtrips", roadtrips_1.getRoadtrips);
const upload = (0, multer_1.default)({
    dest: "./imageUploads",
});
router.post("/addRoadtrip", upload.single("file"), users_1.loggedInValidator, users_1.addressValidator, users_1.descriptionValidator, users_1.dateValidator, roadtrips_1.addRoadtrip, roadtrips_1.imageUpoad);
router.post("/login", users_1.login);
router.get("/logout", users_1.logout);
router.post("/register", users_1.passwordValidator, users_1.userNameValidator, users_1.emailValidator, users_1.dateValidator, users_1.register);
router.get("/me", users_1.me);
const ok = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, helpers_1.response)(res, 200, "OK");
});
router.post("/userNameValidator", users_1.userNameValidator, ok);
router.post("/emailValidator", users_1.emailValidator, ok);
router.post("/passwordValidator", users_1.passwordValidator, ok);
router.post("/dateValidator", users_1.dateValidator, ok);
router.post("/addressValidator", users_1.addressValidator, ok);
router.post("/descriptionValidator", users_1.descriptionValidator, ok);
exports.default = router;
//# sourceMappingURL=index.js.map