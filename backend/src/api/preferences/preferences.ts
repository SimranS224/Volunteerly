import { Request, Response } from "express";
import {sequelize} from "../../db"
import {VolunteerEventPreference, VolunteerAvailability} from "../../db/models"
import { DataType } from "sequelize-typescript";


const getPreferences = async (req:Request , res: Response) =>  {
    console.log("getting volunteers")
    const { user_id } = req.params;
    console.log({user_id});
  
    try {
        const event_preference = await sequelize.sync().then(()=>VolunteerEventPreference.findAll({
            where: {
                volunteer_id: user_id
            }
          }));
          const availability = await sequelize.sync().then(()=>VolunteerAvailability.findAll({
            where: {
                volunteer_id: user_id
            }
          }));

          res.send({
            statusCode: 200,
            body: ({availability:availability, event_preference:event_preference})
        });
    } catch (err) {
        res.send({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not fetch Preferences.'
        })
    }
  }

const updatePreferences = async (req:Request , res: Response) =>  {
    console.log("updating volunteers")
    const { user_id } = req.params;
    console.log({user_id});
    const data = req.body;
    

    try {
        // delete all of the old event_preferences and volunteer availability

        const volunteer_event_preference = await sequelize.sync().then(()=>VolunteerEventPreference.findAll({
            where: {
                volunteer_id: user_id
            }
          }));
        await volunteer_event_preference.forEach(preference => preference.destroy());

        const volunteer_availability = await sequelize.sync().then(()=>VolunteerAvailability.findAll({
            where: {
                volunteer_id: user_id
            }
          }));
        await volunteer_availability.forEach(availability => availability.destroy());

        // create the new preferences and availability
        const event_preference = []
        const availability = []
        for(let i =0; i< data.event_preference.length; i++){
            let ev_pref = data.event_preference[i]
            await VolunteerEventPreference.create(ev_pref).then((new_ev_pref) => {
                event_preference.push({"volunteer_id": new_ev_pref.volunteer_id, "event_type_id": new_ev_pref.event_type_id})
                console.log("event preference is: ", event_preference)
            })
        }
        for(let i =0; i< data.availability.length; i++){
            let av = data.availability[i]
            delete av["id"]
            await VolunteerAvailability.create(av).then((new_av) => {
                availability.push({id: new_av.id,volunteer_id:new_av.volunteer_id, day_of_week:new_av.day_of_week, start_hour:new_av.start_hour, end_hour:new_av.end_hour})
                console.log("availability list is: ", availability)
    
            })
        }
                const response = {availability:availability, event_preference:event_preference}
        console.log("response is:", response)
        res.send({
            statusCode: 200,
            body: JSON.stringify(response)
        });
    } catch (err) {
        res.send({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not fetch Preferences.'
        })
    }

}

export { getPreferences, updatePreferences};
