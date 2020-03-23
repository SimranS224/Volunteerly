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
  var DBSecretsStoreArn = process.env.DBSecretsStoreArn;
  var DBAuroraClusterArn = process.env.DBAuroraClusterArn;
  var DatabaseName = process.env.DatabaseName;
  console.log("params");
  
  const params = {
    secretArn: DBSecretsStoreArn,
    resourceArn: DBAuroraClusterArn,
    sql: sqlStatement,
    database: DatabaseName
  }
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