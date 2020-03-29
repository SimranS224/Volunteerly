
import { Event, EventType } from "../../db/models"
import {sequelize} from "../../db"
import { Request, Response } from "express";


const getEvents = async (req: Request, res: Response) => {
  //const { userId, availability, timeRanges } = req.body;

  console.log(`Getting events`)
  try {
      const events = await sequelize.sync().then(()=>Event.findAll({}));
      res.send({
          statusCode: 200,
          body: events
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

const addEvent = async (req: Request, res: Response) => {
  const event =  req.body;
  // find event id from event type tabel using event.eventType
  let eventId;
  try {
    const currEventType = await sequelize.sync().then(()=>EventType.findAll({
      where: {
        text: event.eventType
      }
    }));
    eventId = currEventType[0].id
  } catch (err) {
      console.log(`Failed to get event type - ${err.message}`)
      return res.send({
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message || 'Could not fetch the Enrollment.'
      })
  }
  // use id to create event
  event.event_category_id = eventId
  event.time_range = event.timeRange
  console.log({event});
  let allEvents;
  try {
    allEvents = await sequelize.sync().then(()=> Event.findAll())
    console.log({allEvents});
    
  } catch (err) {
      console.log(`Failed to find all events - ${err.message}`)
      console.log({err});
      
      return res.send({
          statusCode: err.statusCode,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message
      })
  }
  event.id = allEvents.length + 1
  
  let newEvent;

  try {
    newEvent = await sequelize.sync().then(()=> Event.create(event))
    console.log({newEvent});
    
  } catch (err) {
      console.log(`Failed to create events - ${err.message}`)
      console.log({err});
      
      return res.send({
          statusCode: err.statusCode,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message
      })
  }

  // after creating event send back all events of the organization_id 

  allEvents.push(newEvent)
  return res.send({
    statusCode: 200,
    body: allEvents
  });
}


export  {addEvent, getEvents }