import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

export const router = express.Router();

 
const AWS = require('aws-sdk')
const RDS = new AWS.RDSDataService()
 
const getEvents = async (req:Request , res: Response) =>  {
    console.log("hereerre");
    console.log(req.query);
    res.send("finished");
  };

router.use("/getEvents", getEvents);