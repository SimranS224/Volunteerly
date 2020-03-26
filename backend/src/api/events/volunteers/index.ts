import express from "express";

import { getAllVolunteers, addVolunteer, login } from "./updateVolunteer";
export const router = express.Router();


router.get("/login", login)
router.get("/", getAllVolunteers)
router.post("/",addVolunteer)
