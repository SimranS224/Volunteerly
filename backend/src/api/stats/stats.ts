import { Request, Response } from "express";
import {sequelize} from "../../db"
import {Stat, StatCategory} from "../../db/models"


const getStatistics = async (req:Request , res: Response) =>  {
    console.log("getting statistics for a volunteer")
    const { user_id } = req.params;
    console.log({user_id});
  
    try {
        const statistics = await sequelize.sync().then(()=>Stat.findAll({
            where: {
                volunteer_id: user_id
            },include:[StatCategory]
          }));

          res.send({
            statusCode: 200,
            body: {statistics:statistics}
        });
    } catch (err) {
        res.send({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not fetch Statistics.'
        })
    }
  }


  export {getStatistics}