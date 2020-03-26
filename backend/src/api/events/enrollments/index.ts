import express, { Request, Response } from "express";
export const router = express.Router();
import {Volunteer} from "../../../db/models"
import {sequelize} from "../../../db"

const getEnrollments = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    console.log("getting enrollments")
    try {
        const user = await sequelize.sync().then(()=>Volunteer.findAll({
            where: {
                id: user_id
            }
            }));
        res.send({
            statusCode: 200,
            body: JSON.stringify(user)
        });
    } catch (err) {
        res.send({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not fetch the Note.'
        })
    }
    res.send(200);
}

router.post("/:user_id", getEnrollments)