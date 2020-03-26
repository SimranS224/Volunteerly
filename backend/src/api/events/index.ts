import express, { Request, Response } from "express";
export const router = express.Router();
import {Volunteer, Event} from "../../db/models"
import {sequelize} from "../../db"

const getEvents = async (req: Request, res: Response) => {
    const { user_id } = req.body;

    console.log(`Getting enrollments - user_id: ${user_id}`)
    try {
        const user = await sequelize.sync().then(()=>Volunteer.findAll({
            where: {
                id: user_id
            },
            include: [Event]
        }));
        res.send({
            statusCode: 200,
            body: JSON.stringify(user[0].events)
        });
    } catch (err) {
        console.log(`Failed to get enrollments - user_id: ${user_id} - ${err.message}`)
        res.send({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not fetch the Enrollment.'
        })
    }
}

router.post("/", getEvents)
