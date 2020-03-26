import express from "express";

import { getAllVolunteers, addVolunteer } from "./updateVolunteer";
export const router = express.Router();



router.get("/", getAllVolunteers)
router.post("/",addVolunteer)
