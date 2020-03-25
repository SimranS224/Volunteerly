// import express, { Request, Response } from "express";
import {Person, Volunteer} from "../../db/models"
import {sequelize} from "../../db"
// export const router = express.Router();

const get_volunteers = async (req:Request , res: Response) =>  {
    console.log("running volunteers")
    sequelize.sync().then(()=> Volunteer.create({name:'Test volunteer',email:'test', password:'another', profile_picture_url:'test'}));
  
}
export {get_volunteers}
