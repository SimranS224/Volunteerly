// import express, { Request, Response } from "express";
import {Volunteer} from "../../db/models"
import {sequelize} from "../../db"
// export const router = express.Router();

const post_volunteers = async (req:Request , res: Response) =>  {
    console.log("request is:", req)
    console.log("posting volunteers")
    const data = req.body;
    console.log("request body", data)
    // sequelize.sync().then(()=> Volunteer.create({name:'Test volunteer',email:'test', password:'another', profile_picture_url:'test'}));
    sequelize.sync().then(()=>Volunteer.create(data)).then(response => res.send(response))
  
}

const get_volunteers = async (req:Request , res: Response) =>  {
    console.log("getting volunteers")
    sequelize.sync().then(()=> Volunteer.findAll()).then(Volunteer=>console.log(Volunteer))
  
}
export {post_volunteers, get_volunteers}
