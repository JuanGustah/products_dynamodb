import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "../../infra/dynamo";

export async function createTableService(tableSchema:any){
    try{
        const command = new CreateTableCommand(tableSchema);

        const table = await dynamoClient.send(command);
        
        return table;
    }catch(error){
        throw error;
    }
}