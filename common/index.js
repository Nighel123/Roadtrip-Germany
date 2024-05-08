"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthToNumber = exports.months = exports.log = void 0;
__exportStar(require("./mongoose.gen"), exports);
var Sex;
(function (Sex) {
    Sex["m\u00E4nnlich"] = "m\u00E4nnlich";
    Sex["weiblich"] = "weiblich";
})(Sex || (Sex = {}));
var log = function (message) { return console.log(message); };
exports.log = log;
exports.months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
];
var monthToNumber = function (month) { return exports.months.indexOf(month) + 1; };
exports.monthToNumber = monthToNumber;
