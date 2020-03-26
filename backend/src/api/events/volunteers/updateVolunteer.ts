import { Request, Response } from "express";
import {Volunteer} from "../../../db/models"
import {sequelize} from "../../../db"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async (req:Request , res: Response) =>  { 
  console.log("login")
  try{
    const {email, password} = req.body;
    await sequelize.sync()
    const users = await Volunteer.findAll()
      for(let i = 0; i < users.length; i++){
          if(users[i].email == email){
              console.log("found existing email")
              const passwordIsValid = bcrypt.compareSync(password, users[i].password);
              if(!passwordIsValid){
                return res.send({ statusCode: 401, msg: "Invalid login!", token: null })
              }
              const token = jwt.sign({ id: email }, "volunteer_secret!!!")

              return res.send({statusCode: 200, msg: "", token: token, level: users[i].level})
          }
      }
    return res.send({ statusCode: 401, msg: "Invalid login!", token: null }) 
  }
  catch (err){
    return res.send({
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message || 'Could not fetch the Note.'
      })
  }
}

const addVolunteer = async (req:Request , res: Response) =>  {
  // console.log("request is:", req)
  console.log("posting volunteers foo")
    const {email, first_name, last_name, password} = req.body;
    console.log(req.body)
    const hashedPassword = bcrypt.hashSync(password, 8);
    console.log("hash", hashedPassword)
    console.log("checking foobar")
    // sequelize.sync().then(()=>Volunteer.create(data)).then(response => res.send(response))
    await sequelize.sync()
      console.log("synced")
    const users = await Volunteer.findAll()
    for(let i = 0; i < users.length; i++){
        if(users[i].email == email){
            console.log("found existing email")
            return res.send({status: 'error', msg: "Account with email already exists"})
        }
    }
    console.log("hello!!")
    console.log("raw data")
    const v_body = {id: 6, email: email, first_name: first_name, last_name: last_name, password: hashedPassword, level: 0}
    console.log(v_body)
    const newVolunteer = await Volunteer.create(v_body)
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
