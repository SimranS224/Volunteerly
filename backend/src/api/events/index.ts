import express, { Request, Response } from "express";
import {Volunteer, Event} from "../../db/models"
import {sequelize} from "../../db"

export const router = express.Router();


const getEvents = async (req: Request, res: Response) => {
    //const { userId, availability, timeRanges } = req.body;

    console.log(`Getting events`)
    try {
        const events = await sequelize.sync().then(()=>Event.findAll({}));
        res.send({
            statusCode: 200,
            body: JSON.stringify(events)
        });
    } catch (err) {
        console.log(`Failed to get events - ${err.message}`)
        res.send({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not fetch the Enrollment.'
        })
    }
}

router.get("/", getEvents)
