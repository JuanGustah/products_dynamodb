import { DescribeTableCommand, ResourceNotFoundException } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "../../infra/dynamo";

export async function getTableService(tableName:string){
    try{
        const command = new DescribeTableCommand({
            TableName: tableName
        });

        const tableInfo = await dynamoClient.send(command);
        
        return tableInfo;
    }catch(error){
        if(error instanceof ResourceNotFoundException){
            return null;
        }
        throw error;
    }
}