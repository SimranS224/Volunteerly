import express from "express";
import serverless from "serverless-http";
<<<<<<< HEAD
import { router as hello } from "./helloworld";
import { router as events } from "./events";
=======
import { router as health_check } from "./health_check";
>>>>>>> 497a23c6f41744b633cc5552558c821d767838bd
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(compression());
app.use(bodyParser.json());

app.use("/health_check", hello);
app.use("/events", events);

export const handler = serverless(app);