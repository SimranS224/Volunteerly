import express from "express";
import { getAllVolunteers, addVolunteer, getVolunteer } from "./updateVolunteer";
export const router = express.Router();


router.get("/:user_id", getVolunteer)
router.get("/", getAllVolunteers)
router.post("/",addVolunteer)

