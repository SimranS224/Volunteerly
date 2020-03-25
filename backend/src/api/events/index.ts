import express from "express";
import serverless from "serverless-http";
import { router as health_check } from "./health_check";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import {Sequelize} from 'sequelize-typescript';
import dotenv from "dotenv";
import {Person,Volunteer} from "../../db/models"
dotenv.config();

const app = express();
console.log("created server")
app.use(cors());
app.use(morgan("combined"));
app.use(compression());
app.use(bodyParser.json());
const get_sequelize = () => {
    if(process.env.NODE_ENV === "production"){
        // return new Sequelize(process.env.DATABASE_URL);
        return new Sequelize(process.env.DATABASE_URL,{operatorsAliases: false,models: [Person,Volunteer]});
    }
    else{
        // return new Sequelize(process.env.DEV_DATABASE_URL);
        return new Sequelize(process.env.DEV_DATABASE_URL,{operatorsAliases: false, models: [Person,Volunteer]});
    }
}

// const sequelize = get_sequelize();
app.use("/health_check", health_check);
const sequelize = get_sequelize()
//TODO add all of the models
//TODO how to make sure this is run before everything else?
const handler = serverless(app);
console.log("exporting")
export {handler, sequelize};

 