import { Request, Response } from "express";
import {User} from "../../db/models"
import {sequelize} from "../../db"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async (req:Request , res: Response) =>  { 
  console.log("login")
  try{
    const {email, password} = req.body;
    await sequelize.sync()
    const users = await User.findAll()
      for(let i = 0; i < users.length; i++){
          if(users[i].email == email){
              console.log("found existing email")
              const passwordIsValid = bcrypt.compareSync(password, users[i].password);
              if(!passwordIsValid){
                return res.send({ statusCode: 401, msg: "Invalid login!", token: null })
              }
              const token = jwt.sign({ id: email }, "volunteer_secret!!!")

              return res.send({statusCode: 200, msg: "", id: users[i].id, token: token, level: users[i].level, first_name: users[i].first_name, last_name: users[i].last_name, profile_picture_url: users[i].profile_picture_url})
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


export { login};
