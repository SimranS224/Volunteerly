import express from "express";
import serverless from "serverless-http";
import { router as events } from "./events";
import { router as health_check } from "./health_check";
import {get_volunteers, post_volunteers} from "./volunteers"
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
console.log("created server")
app.use(cors());
app.use(morgan("combined"));
app.use(compression());
app.use(bodyParser.json());

app.use("/health_check", health_check);
app.use("/events", events);
app.get("/volunteers", get_volunteers)
app.post("/volunteers",post_volunteers)
const handler = serverless(app);
console.log("exporting")
export {handler};

 