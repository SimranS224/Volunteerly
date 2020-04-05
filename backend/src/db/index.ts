// import dotenv from "dotenv";
import {Sequelize} from 'sequelize-typescript';
import {User, VolunteerAvailability, EventType, Stat, StatCategory, Event,
VolunteerEventPreference, Achievement, AchievementEarned, Enrollment, Organization} from "./models"

// dotenv.config();

const dbName: string = process.env.DB_NAME ? process.env.DB_NAME : "test";
const userName: string =  process.env.DB_USER ? process.env.DB_USER : "user";
const password: string =  process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "user";
const currPort: number =  process.env.DB_PORT ? process.env.DB_PORT as unknown as number : 5432;


const getSequelize = () => {
  const modelsList = [User, VolunteerAvailability, EventType, Stat, StatCategory, Event,
    VolunteerEventPreference, Achievement, AchievementEarned, Enrollment, Organization]
  // if(process.env.NODE_ENV === "production"){
  //     //TODO implement production Sequelize
  //     return new Sequelize(prodDbUrl,{operatorsAliases: false,models: modelsList});
  // }
  // else{
      // return new Sequelize(process.env.DEV_DATABASE_URL,{operatorsAliases: false, models: modelsList });
    // console.log(process.env)
    // console.log({dbName,
    //   userName,
    //   password,
    //   other: {
    //     dialect: 'postgres',
    //     host: process.env.DB_HOST,
    //     port: currPort,
    //     models: modelsList,
    //     dialectOptions: {
    //       connectTimeout: 60000,
    //       ssl:true
    //     },
    //   }})
  //   return new Sequelize(
  //   dbName,
  //   userName,
  //   password,
  //   {
  //     dialect: 'postgres',
  //     host: process.env.host,
  //     port: currPort,
  //     models: modelsList,
  //     dialectOptions: {
  //       connectTimeout: 60000,
  //       ssl: true
  //     },
  //   },
  // )
  return new Sequelize(
    "d993cdeukh3597",
    "fekvgreotoxbtf",
    "09353fc0059f14f6e40484f4a6fe64d179a8a431f5b845fa3478c72b6c0516c5",
    {
      dialect: 'postgres',
      host: "ec2-54-81-37-115.compute-1.amazonaws.com",
      port: 5432,
      models: modelsList,
      dialectOptions: {
        connectTimeout: 60000,
        ssl: true
      },
    },
  )
  // }
}

const sequelize = getSequelize()

export { sequelize }