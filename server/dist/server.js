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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const helpers_1 = require("./controllers/helpers");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const corsOptions = {
    credentials: true,
    origin: process.env.CLIENT_URL,
};
app.use((0, cors_1.default)(corsOptions));
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
app.use(express_1.default.static("./imageUploads"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_SECRET || "ich bin ein drolliger Lollo",
    store: connect_mongo_1.default.create({ mongoUrl: uri }),
    name: process.env.COOKIE_NAME || "Meine Oma Stinkt unter den Achseln 1965",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true,
    },
}));
app.use(routes_1.default);
app.use(function (err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error(err.stack);
        (0, helpers_1.response)(res, 500, "Something broke!");
    });
});
mongoose_1.default
    .connect(uri)
    .then((mon) => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
    .catch((error) => {
    throw error;
});
//# sourceMappingURL=server.js.map