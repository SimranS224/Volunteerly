import express, { Request, Response } from "express";
export const router = express.Router();
import {Volunteer, Event, Enrollment} from "../../db/models"
import {sequelize} from "../../db"

const getEnrollments = async (req: Request, res: Response) => {
    const { user_id } = req.params;

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

const addEnrollment = async (req: Request, res: Response) => {
    const { user_id, event_id } = req.params;

    console.log(`Getting enrollments - user_id: ${user_id} - event_id: ${event_id}`)
    try {
        await sequelize.sync()
            .then(() => Enrollment.create({
                user_id: user_id,
                event_id: event_id
            }));
        res.send({
            statusCode: 200,
            body: "Successfully created enrollment"
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

router.get("/:user_id", getEnrollments)
router.post("/add", addEnrollment)
