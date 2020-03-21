"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const helloworld_1 = require("./helloworld");
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(morgan_1.default("combined"));
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use("/*/hello", helloworld_1.router);
exports.handler = serverless_http_1.default(app);
//# sourceMappingURL=index.js.map