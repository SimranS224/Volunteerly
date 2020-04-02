import { Request, Response } from "express";
import {sequelize} from "../../db"
import {Achievement, AchievementEarned, StatCategory} from "../../db/models"


const getAchievements = async (req:Request , res: Response) =>  {
    console.log("getting achievements for a volunteer")
    const { user_id } = req.params;
    console.log({user_id});
  
    try {
        const achievements = await sequelize.sync().then(()=>AchievementEarned.findAll({
            where: {
                volunteer_id: user_id
            },include: [{
                model: Achievement,
                include:[StatCategory]
            }]
          }));

          res.send({
            statusCode: 200,
            body: {achievements:achievements}
        });
    } catch (err) {
        res.send({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not fetch Statistics.'
        })
    }
  }


  export {getAchievements}