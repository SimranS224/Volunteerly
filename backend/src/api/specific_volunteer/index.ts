import express from "express";
import serverless from "serverless-http";
import {router as get_info} from './get_info';
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(compression());
app.use(bodyParser.json());

app.use("/*/one", get_info)
// app.use("/database", db_calls)

export const handler = serverless(app)
