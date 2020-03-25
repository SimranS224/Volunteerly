import express, { Request, Response } from "express";
import {Volunteer} from "../../db/models"
import {sequelize} from "../../db"

export const router = express.Router();


const post_volunteers = async (req:Request , res: Response) =>  {
    // console.log("request is:", req)
    console.log("posting volunteers")
    const data = req.body;
    console.log({data})
    // sequelize.sync().then(()=>Volunteer.create(data)).then(response => res.send(response))
    sequelize.sync().then(() => Volunteer.create(data)).then(newVolunteer => res.send(newVolunteer))
}

const get_volunteers = async (req:Request , res: Response) =>  {
    console.log("getting volunteers")
    sequelize.sync().then(()=>Volunteer.findAll()).then((users)=>res.send(users))
  
}

router.get("/", get_volunteers)
router.post("/",post_volunteers)

