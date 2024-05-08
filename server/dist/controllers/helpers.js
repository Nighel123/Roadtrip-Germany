"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (res, status, data) => {
    if (typeof data === "string") {
        res.status(status).json({ message: data });
    }
    else {
        res.status(status).json(data);
    }
};
exports.response = response;
//# sourceMappingURL=helpers.js.map