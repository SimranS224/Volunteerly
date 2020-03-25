import dotenv from "dotenv";
import {Sequelize} from 'sequelize-typescript';
import {Person,Volunteer} from "./models"

dotenv.config();

const AWS = require('aws-sdk')
const RDS = new AWS.RDSDataService()


const db_query = async (event, context) => {
  console.log(event)  // Log the entire event passed in
  console.log("indb query");
  
  // Get the sqlStatement string value
  // TODO: Implement a more secure way (e.g. "escaping") the string to avoid SQL injection
  var sqlStatement = event.sqlStatement;
  console.log({sqlStatement});
  
  // The Lambda environment variables for the Aurora Cluster Arn, Database Name, and the AWS Secrets Arn hosting the master credentials of the serverless db
  var secretArn = process.env.secretArn;
  var resourceArn = process.env.resourceArn;
  var DatabaseName = process.env.database;
  console.log({DatabaseName});
  
  const params = {
    "secretArn": secretArn,
    "resourceArn": resourceArn,
    "sql": sqlStatement,
    "database": DatabaseName
  };

  const x = 1;
  console.log({params});
  
  try {
    let dbResponse = await RDS.executeStatement(params).promise()
    console.log(JSON.stringify(dbResponse, null, 2))
    
    return JSON.stringify(dbResponse)

  } catch (error) {
      console.log(error)
    return error
  }
}

const get_sequelize = () => {
  if(process.env.NODE_ENV === "production"){
      return new Sequelize(process.env.DATABASE_URL,{operatorsAliases: false,models: [Person,Volunteer]});
  }
  else{
      return new Sequelize(process.env.DEV_DATABASE_URL,{operatorsAliases: false, models: [Person,Volunteer]});
  }
}

const sequelize = get_sequelize()

export { db_query as db, sequelize}