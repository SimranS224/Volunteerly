import { Request, Response } from "express";
import {sequelize} from "../../db"
import {VolunteerEventPreference, VolunteerAvailability, EventType, Event, Organization} from "../../db/models"
import { DataType } from "sequelize-typescript";
import { Op } from "sequelize";


const getPreferences = async (req:Request , res: Response) =>  {
    const { user_id } = req.params;
  
    try {
        const event_preference = await sequelize.sync().then(()=>VolunteerEventPreference.findAll({
            where: {
                volunteer_id: user_id
            },include:[EventType]
          }));
          const availability = await sequelize.sync().then(()=>VolunteerAvailability.findAll({
            where: {
                volunteer_id: user_id
            }
          }));

          res.send({
            statusCode: 200,
            body: {availability:availability, event_preference:event_preference}
        });
    } catch (err) {
        res.send({
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: err.message || 'Could not fetch Preferences.'
        })
    }
}

// https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


const getAllDaysInRange = (startDate, endDate) => {
    const weekdays = ["Sunday", "Monday" , "Tuesday", "Wednesday","Thursday" , "Friday", "Saturday"]
    let allDates = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        allDates.push(weekdays[currentDate.getDay()]);
        currentDate = currentDate.addDays(1);
    }
    return allDates;
}

const updatePreferences = async (req:Request , res: Response) =>  {
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
            })
        }
        for(let i =0; i< data.availability.length; i++){
            let av = data.availability[i]
            delete av["id"]
            await VolunteerAvailability.create(av).then((new_av) => {
                availability.push({id: new_av.id,volunteer_id:new_av.volunteer_id, day_of_week:new_av.day_of_week, start_hour:new_av.start_hour, end_hour:new_av.end_hour})
    
            })
        }
        // get events based on preferences


        const eventTypes = event_preference.map((pref) => {
            return { event_category_id: pref.event_type_id }
        })

        const daysOfTheWeek = availability.map((pref) => {
            return pref.day_of_week 
        })

        const daysOfTheWeekAvailbility = availability.map((pref) => {
            const day = pref.day_of_week;
            const start = pref.start_hour;
            const end = pref.end_hour;
            const dayOfWeek = [day, start, end ];
            return dayOfWeek
        })

        const today = new Date();
        const eventsWithValidType = await sequelize.sync().then(()=>Event.findAll({
            where: {
                [Op.or]: eventTypes,
                start_date: {
                    [Op.gte]: today
                }
            },
            include: [Organization]
        })
        
    
        const eventWithValidDates = eventsWithValidType.filter((event) => {
            const daysOfTheEvent = getAllDaysInRange(event.start_date, event.end_date)

            for (let i = 0; i < daysOfTheEvent.length; i++){
                let curWeekDay = daysOfTheEvent[i];
                if (daysOfTheWeek.indexOf(curWeekDay) > -1){
                    for (let j = 0; j < daysOfTheWeekAvailbility.length; j++){
                        if (curWeekDay === daysOfTheWeekAvailbility[j][0]){
                        // check evnetstartdate <= availbility start or end of availbilty <= endofEvent
                        
                            if ((daysOfTheWeekAvailbility[j][1] <= event.start_time &&  event.start_time <= daysOfTheWeekAvailbility[j][2])
                                || (daysOfTheWeekAvailbility[j][1] <= event.start_time &&  event.end_time <= daysOfTheWeekAvailbility[j][2]) ){
                                return event;
                            }
                        }
                    }


                }
            }
        }
      
        const response = {availability:availability, event_preference:event_preference, newEvents: eventWithValidDates}
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
