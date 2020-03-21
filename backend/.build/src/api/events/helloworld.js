"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const hello = (req, res) => {
    console.log("hereerre");
    res.send('Hello World!');
};
exports.router.use("/", hello);
//# sourceMappingURL=helloworld.js.map