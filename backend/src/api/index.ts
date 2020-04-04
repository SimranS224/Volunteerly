import express from "express";
import serverless from "serverless-http";
import { router as login } from "./login";
import { router as volunteers } from "./volunteers/new_index";
import { router as event_types } from "./event_types";
import { router as db_calls } from "./database_events";
import { router as stats } from "./stats";
import { router as enrollments } from "./enrollments";
import { router as events } from "./events";
import {router as preferences} from "./preferences"
import {router as achievements} from "./achievements/index"
import {router as organizations} from "./organizations";
import {router as statistics} from "./stats";
import jwt from 'jsonwebtoken'
import {router as healthcheck} from "./healthcheck";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("request deets", req.path)
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else if(req.path == '/dev/api/login' || req.path == '/dev/api/register' || req.path == '/dev/api/events' || req.path == '/dev/api/events/undefined' || req.path == '/dev/api/event_types'){
    	next()
    }
     else {
        res.sendStatus(401);
    }
};
app.use(cors());
app.use(morgan("combined"));
app.use(compression());
app.use(bodyParser.json());

app.use(authenticateJWT)

app.use("/*/healthcheck", healthcheck)
app.use("/*/events", events)
app.use("/*/event_types", event_types)
app.use("/*/enrollments", enrollments)
app.use("/*/volunteers", volunteers)
app.use("/*/database", db_calls)
app.use("/*/login", login)
app.use("/*/achievements", achievements)
app.use("/*/preferences", preferences)
app.use("/*/organizations", organizations)
app.use("/*/statistics", statistics)



export const handler = serverless(app)
