import express, { Request, Response } from "express";
import {sequelize} from "../../db"
import { Organization } from "../../db/models"

export const router = express.Router();

const getOrganizations = async (req: Request, res: Response) => {
  //const { userId, availability, timeRanges } = req.body;

  console.log(`Getting prganizations`)
  try {
      const prganizations = await sequelize.sync().then(()=>Organization.findAll({}));
      return res.send({
          statusCode: 200,
          body: JSON.stringify(prganizations)
      });
  } catch (err) {
      console.log(`Failed to get prganizations - ${err.message}`)
      return res.send({
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message || 'Could not fetch the Enrollment.'
      })
  }
}



router.get("/", getOrganizations);