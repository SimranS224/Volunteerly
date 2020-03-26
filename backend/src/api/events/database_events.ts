import express, { Request, Response } from "express";
import {sequelize} from "../../db"
import {Volunteer, VolunteerAvailability, Organization, EventType, Stat, StatCategory, Event,
    VolunteerEventPreference, Achievement, AchievementEarned, Enrollment} from "../../db/models"

import volunteers from "../../db/migrations/volunteers.json"
import volunteer_availabilities from "../../db/migrations/volunteer_availability.json"
import organizations from "../../db/migrations/organizations.json"
import event_type from "../../db/migrations/event_type.json"
import stat from "../../db/migrations/stat.json"
import stat_category from "../../db/migrations/stat_category.json"
import event from "../../db/migrations/event.json"
import volunteer_event_preferences from "../../db/migrations/volunteer_event_preferences.json"
import enrollment from "../../db/migrations/enrollment.json"

export const router = express.Router();
// import * as fs from "fs";
// const fs = require('fs')
const path = require("path");
// const file = fs.readFileSync(path.resolve(__dirname, "../file.xml"));
const initialize_db = async (req:Request , res: Response) =>  {
    console.log("calling initialize_db")
    // console.log("the volunteers are:", volunteers)
    await sequelize.sync({force:true}).then(() => volunteers.forEach(volunteer => Volunteer.create(volunteer)))
    await volunteer_availabilities.forEach(el => VolunteerAvailability.create(el))
    await organizations.forEach(el => Organization.create(el))
    await event_type.forEach(el => EventType.create(el))
    await stat.forEach(el => Stat.create(el))
    await stat_category.forEach(el => StatCategory.create(el))
    await event.forEach(el => Event.create(el))
    await volunteer_event_preferences.forEach(el => VolunteerEventPreference.create(el))
    await enrollment.forEach(el => Enrollment.create(el))




    return res.send("finished")
}

const delete_db = async (req:Request , res: Response) =>  {
    console.log("clearing db")
    await sequelize.sync({force:true})
    return res.send("finished")

}

router.delete("/", delete_db)
router.get("/", initialize_db)
// router.post("/",post_volunteers)
