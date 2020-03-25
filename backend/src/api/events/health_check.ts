import express, { Request, Response } from "express";
import { db } from "../../db";

export const router = express.Router();

const health_check = async (req:Request , res: Response) =>  {
  console.log("hereerre");

  const query = { "sqlStatement": "SELECT * FROM volunteers" }
  const filler = "none";
  const result = await db.db_query(query, filler);
  res.send(result);
  // res.send('Hello World!');
};


router.use("/", health_check);
