import dotenv from "dotenv";
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

export const db =  { db_query}