import express from "express";
import { Request, Response } from "express";
import {Volunteer} from "../../../db/models"
import { getAllVolunteers, addVolunteer } from "./updateVolunteer";
import {sequelize} from "../../../db"
export const router = express.Router();


// const getSpecificVolunteer = async (req: Request , res: Response) =>  {

//   const { user_id } = req.params;
//   console.log("getting volunteer")
//   console.log({user_id});
  
//   try {
//       const user = await sequelize.sync().then(()=>Volunteer.findAll({
//           where: {
//             id: user_id
//           }
//         }));
//       res.send({
//           statusCode: 200,
//           body: JSON.stringify(user)
//       });
//   } catch (err) {
//       res.send({
//           statusCode: err.statusCode || 500,
//           headers: { 'Content-Type': 'text/plain' },
//           body: err.message || 'Could not fetch the Note.'
//       })
//   }
// }

router.get("/:user_id", getAllVolunteers)

router.get("/", getAllVolunteers)
router.post("/",addVolunteer)

