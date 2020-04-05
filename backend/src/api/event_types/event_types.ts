import { Request, Response } from "express";
import {sequelize} from "../../db"
import {EventType} from "../../db/models"
import { DataType } from "sequelize-typescript";

export const getEventTypes = async (req:Request , res: Response) =>  {
  
    try {
        const event_types = await sequelize.sync().then(()=>EventType.findAll());
        res.send({
            statusCode: 200,
            body: {event_type:event_types}
        });
    } catch (err) {
        res.send({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not fetch Preferences.'
        })
    }
  }