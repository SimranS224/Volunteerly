import dotenv from "dotenv";
import {Sequelize} from 'sequelize-typescript';
import {User, VolunteerAvailability, EventType, Stat, StatCategory, Event,
VolunteerEventPreference, Achievement, AchievementEarned, Enrollment, Organization} from "./models"

dotenv.config();

const dbName: string = process.env.dbname ? process.env.dbname : "test";
const userName: string =  process.env.user ? process.env.user : "user";
const password: string =  process.env.password ? process.env.password : "user";
const currPort: number =  process.env.port ? process.env.port as unknown as number : 5432;


const getSequelize = () => {
  const modelsList = [User, VolunteerAvailability, EventType, Stat, StatCategory, Event,
    VolunteerEventPreference, Achievement, AchievementEarned, Enrollment, Organization]
  // if(process.env.NODE_ENV === "production"){
  //     //TODO implement production Sequelize
  //     return new Sequelize(prodDbUrl,{operatorsAliases: false,models: modelsList});
  // }
  // else{
      // return new Sequelize(process.env.DEV_DATABASE_URL,{operatorsAliases: false, models: modelsList });
  return new Sequelize(
    dbName,
    userName,
    password,
    {
      dialect: 'postgres',
      host: process.env.host,
      port: currPort,
      models: modelsList,
      dialectOptions: {
        connectTimeout: 60000,
        ssl:true
      },
    },
  )
  // }
}

const sequelize = getSequelize()

export { sequelize }