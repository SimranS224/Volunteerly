import express, { Request, Response } from "express";
import {sequelize} from "../db"
import {User, VolunteerAvailability, EventType, Stat, StatCategory, Event,
    VolunteerEventPreference, Achievement, AchievementEarned, Enrollment, Organization} from "../db/models"

import volunteers from "../db/migrations/volunteers.json"
import volunteer_availabilities from "../db/migrations/volunteer_availability.json"
import event_type from "../db/migrations/event_type.json"
import stat from "../db/migrations/stat.json"
import stat_category from "../db/migrations/stat_category.json"
import event from "../db/migrations/event.json"
import volunteer_event_preferences from "../db/migrations/volunteer_event_preferences.json"
import enrollment from "../db/migrations/enrollment.json"
import achievement from "../db/migrations/achievement.json"
import achievement_earned from "../db/migrations/achievement_earned.json"  
import organization from "../db/migrations/organizations.json"

export const router = express.Router();
// import * as fs from "fs";
// const fs = require('fs')
const path = require("path");
// const file = fs.readFileSync(path.resolve(__dirname, "../file.xml"));
const initialize_db = async (req:Request , res: Response) =>  {

    await sequelize.sync({force:true}).then(() => volunteers.forEach(volunteer => User.create(volunteer)))

    for(let i=0;i<organization.length;i++){
        let el = organization[i]
        await Organization.create(el)
    }

    for(let i=0; i<volunteer_availabilities.length; i++){
        let el = volunteer_availabilities[i]
        await VolunteerAvailability.create(el)
    }

    for(let i=0; i<event_type.length; i++){
        let el = event_type[i]
        await EventType.create(el)
    }

    for(let i=0;i<stat_category.length;i++){
        let el = stat_category[i]
        await StatCategory.create(el)
    }

    for(let i=0; i<stat.length; i++){
        let el = stat[i]
        await Stat.create(el)
    }

    for(let i=0; i<event.length; i++){
        let el = event[i]
        await Event.create(el)
    }

    for(let i=0; i<volunteer_event_preferences.length; i++){
        let el = volunteer_event_preferences[i]
        await VolunteerEventPreference.create(el)
    }

    for(let i=0; i<enrollment.length; i++){
        let el = enrollment[i]
        await Enrollment.create(el)
    }
    for(let i=0;i<achievement.length;i++){
        let el = achievement[i]
        await Achievement.create(el)
    }
    for(let i=0;i<achievement_earned.length;i++){
        let el = achievement_earned[i]
        await AchievementEarned.create(el)
    }



    return res.send("finished")
}

const delete_db = async (req:Request , res: Response) =>  {
    await sequelize.sync({force:true})
    return res.send("finished")

}

router.delete("/", delete_db)
router.get("/", initialize_db)
// router.post("/",post_volunteers)
