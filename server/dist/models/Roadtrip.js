"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roadtrip = exports.Address = void 0;
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    town: {
        type: String,
        required: true,
    },
    land: {
        type: String,
        required: true,
    },
});
exports.Address = (0, mongoose_1.model)("Address", AddressSchema);
const RoadtripSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
    },
    iniUser: {
        type: String,
        required: true,
    },
    startAddress: { type: AddressSchema, required: true },
    destAddress: { type: AddressSchema, required: true },
    startDateGF: {
        type: Date,
        required: true,
    },
    imgExt: {
        type: String,
        required: true,
    },
});
exports.Roadtrip = (0, mongoose_1.model)("Roadtrip", RoadtripSchema);
//# sourceMappingURL=Roadtrip.js.map