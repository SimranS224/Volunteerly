import dotenv from "dotenv";
import {Sequelize} from 'sequelize-typescript';
import {Volunteer, VolunteerAvailability, Organization, Category, Stat, EventType, Event,
VolunteerEventPreference, Achievement, Enrollment} from "./models"

dotenv.config();

const get_sequelize = () => {
  const modelsList = [Volunteer, VolunteerAvailability, Organization, Category, Stat, EventType, Event,
    VolunteerEventPreference, Achievement, Enrollment]
  if(process.env.NODE_ENV === "production"){
      return new Sequelize(process.env.DATABASE_URL,{operatorsAliases: false,models: modelsList});
  }
  else{
      return new Sequelize(process.env.DEV_DATABASE_URL,{ssl: true, operatorsAliases: false, models: modelsList });
  }
}

const sequelize = get_sequelize()

export { sequelize }