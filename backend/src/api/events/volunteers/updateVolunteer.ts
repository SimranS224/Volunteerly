import { Request, Response } from "express";
import {Volunteer} from "../../../db/models"
import {sequelize} from "../../../db"

const addVolunteer = async (req:Request , res: Response) =>  {
  // console.log("request is:", req)
  console.log("posting volunteers")
  const data = req.body;
  console.log({data})
  try {
      const user = await sequelize.sync().then(() => Volunteer.create(data))
      return res.send({
          statusCode: 200,
          body: JSON.stringify(user)
      });
  } catch (err) {
      return res.send({
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message || 'Could not fetch the Note.'
      })
  }
}

const getAllVolunteers = async (req:Request , res: Response) =>  {
  console.log("getting volunteers")
  try {
      const users = await sequelize.sync().then(()=>Volunteer.findAll())
      res.send({
          statusCode: 200,
          body: JSON.stringify(users)
      });
  } catch (err) {
      res.send({
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message || 'Could not fetch the Note.'
      })
  }
}

const getVolunteer = async (req:Request , res: Response) =>  {

  const { user_id } = req.params;
  console.log("getting volunteer")
  try {
      const user = await sequelize.sync().then(()=>Volunteer.findAll({
          where: {
            id: user_id
          }
        }));
      res.send({
          statusCode: 200,
          body: JSON.stringify(user)
      });
  } catch (err) {
      res.send({
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message || 'Could not fetch the Note.'
      })
  }
}

export { addVolunteer, getAllVolunteers, getVolunteer};