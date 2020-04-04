import { Request, Response } from "express";
import {User} from "../../db/models"
import {sequelize} from "../../db"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const addVolunteer = async (req:Request , res: Response) =>  {
  // console.log("request is:", req)
  console.log("posting volunteers foo")
    const {email, first_name, last_name, password, profile_picture_url} = req.body;
    console.log(req.body)
    const hashedPassword = bcrypt.hashSync(password, 8);
    console.log("hash", hashedPassword)
    console.log("checking foobar")
    // sequelize.sync().then(()=>Volunteer.create(data)).then(response => res.send(response))
    await sequelize.sync()
      console.log("synced")
    const users = await User.findAll()
    for(let i = 0; i < users.length; i++){
        if(users[i].email == email){
            console.log("found existing email")
            return res.send({status: 'error', msg: "Account with email already exists"})
        }
    }
    console.log("hello!!")
    console.log("raw data")
    const v_body = {id: users.length + 1, email: email, first_name: first_name, last_name: last_name, password: hashedPassword, level: 0, profile_picture_url: profile_picture_url}
    console.log(v_body)
    const newVolunteer = await User.create(v_body)
    console.log(newVolunteer)
    const token = jwt.sign({ id: email }, process.env.SECRET)

    return res.send({
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      email: email, 
      id: users.length,
      token: token,
      level: 0,
      msg: ""
    })
}

const getAllVolunteers = async (req:Request , res: Response) =>  {
  console.log("getting volunteers")
  const { user_id } = req.params;
  console.log("getting volunteer")
  console.log({user_id});
  if (user_id !== undefined){
    await getSpecificVolunteer(user_id, res);
  } else {
    await getAllVolunteersHelper(res);
   
  }
}


const getSpecificVolunteer = async (userId: any , res: Response) =>  {

  console.log("getting volunteer")
  console.log({userId});
  
  try {
      const user = await sequelize.sync().then(()=>User.findAll({
          where: {
            id: userId
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

const getAllVolunteersHelper =  async (res: Response) =>  {
  try {
      const users = await sequelize.sync().then(()=>User.findAll())
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
