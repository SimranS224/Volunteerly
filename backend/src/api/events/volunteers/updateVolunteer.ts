import { Request, Response } from "express";
import {Volunteer} from "../../../db/models"
import {sequelize} from "../../../db"
import bcrypt from 'bcryptjs'

const addVolunteer = async (req:Request , res: Response) =>  {
  // console.log("request is:", req)
  console.log("posting volunteers")
    const {email, name, password} = req.body;
    console.log(req.body)
    const hashedPassword = bcrypt.hashSync(password, 8);
    console.log("hash", hashedPassword)
    // sequelize.sync().then(()=>Volunteer.create(data)).then(response => res.send(response))
    await sequelize.sync()
        
    const users = await Volunteer.findAll()
    for(let i = 0; i < users.length; i++){
        if(users[i].email == email){
            console.log("found existing email")
            return res.send({status: 'error', msg: "Account with email already exists"})
        }
    }
    console.log("hello ")
    const newVolunteer = await Volunteer.create({email: email, name: name, password: hashedPassword})
    console.log(newVolunteer)
    return res.send({status: "success", msg: ""})
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

export { addVolunteer, getAllVolunteers};