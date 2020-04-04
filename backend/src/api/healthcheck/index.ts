import express from "express";
import { Request, Response } from "express";

export const router = express.Router();

const healthCheck = (req: Request, res: Response) => {
  return res.send({
    statusCode: 200,
    body: JSON.stringify({data: "Health Check works"})
  });

}



router.get("/", healthCheck)
