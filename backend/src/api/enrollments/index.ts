import express, { Request, Response } from "express";
export const router = express.Router();
import {User, Event,Enrollment} from "../../db/models"
import {sequelize} from "../../db"

const getEnrollments = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    console.log(`Getting enrollments - user_id: ${user_id}`)
    try {
        const user = await sequelize.sync().then(()=>User.findAll({
            where: {
                id: user_id
            },
            include: [Event]
        }));
        if(user.length > 0) {
            res.send({
                statusCode: 200,
                body: JSON.stringify(user[0].events)
            });
        } else {
            res.send({
                statusCode: 200,
                body: []
            });  
        }
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
    const { event_id, user_id } = req.body;

    console.log(`adding enrollments - user_id: ${user_id} - event_id: ${event_id}`)
    try {
        await sequelize.sync()
            .then(() => Enrollment.create({
                volunteer_id: user_id,
                event_id: event_id
            }));
        res.send({
            statusCode: 200,
            body: "Successfully added enrollment"
        });
    } catch (err) {
        console.log(`Failed to added enrollments - user_id: ${user_id} - ${err.message}`)
        res.send({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not add the Enrollment.'
        })
    }
}

router.get("/:user_id", getEnrollments)
router.post("/add", addEnrollment)
