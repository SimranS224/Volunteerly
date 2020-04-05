import express from "express";
import serverless from "serverless-http";
import { router as login } from "./login";
import { router as volunteers } from "./volunteers/new_index";
import { router as event_types } from "./event_types";
import { router as db_calls } from "./database_events/database_events";
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
    const rpath = req.path.charAt(req.path.length - 1) === '/' ? req.path.substring(0, req.path.length - 1) : req.path
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else if(rpath == '/dev/api/enrollments/attended' || rpath == '/dev/api/login' || rpath == '/dev/api/register' || rpath == '/dev/api/events' || rpath == '/dev/api/events/undefined' || rpath == '/dev/api/event_types'){
    	next()
    }
    else if(rpath == '/api/enrollments/attended' || rpath == '/api/login' ||  rpath == '/api/register' || rpath == '/api/events' || rpath == '/api/events/undefined' || rpath == '/api/event_types'){
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
app.use("/*/database", db_calls)


app.use(authenticateJWT)

app.use("/*/healthcheck", healthcheck)
app.use("/*/events", events)
app.use("/*/event_types", event_types)
app.use("/*/enrollments", enrollments)
app.use("/*/volunteers", volunteers)
app.use("/*/login", login)
app.use("/*/achievements", achievements)
app.use("/*/preferences", preferences)
app.use("/*/organizations", organizations)
app.use("/*/statistics", statistics)



export const handler = serverless(app)
