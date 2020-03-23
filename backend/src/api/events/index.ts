import express from "express";
import serverless from "serverless-http";
import { router as health_check } from "./health_check";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(compression());
app.use(bodyParser.json());

app.use("/health_check", health_check);

export const handler = serverless(app);