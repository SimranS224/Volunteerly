import express, { Request, Response } from "express";

export const router = express.Router();

const hello = (req:Request , res: Response) =>  {
  console.log("hereerre");
  
  res.send('Hello World!');
};



router.use("/", hello);
