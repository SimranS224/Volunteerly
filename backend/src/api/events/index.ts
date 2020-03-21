import express from "express";
import serverless from "serverless-http";
import { router as hello } from "./helloworld";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(compression());
app.use(bodyParser.json());

app.use("/*/hello", hello);

// export const handler = serverless(app);
module.exports.handler = serverless(app);