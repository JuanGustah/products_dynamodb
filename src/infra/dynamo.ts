import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromEnv } from "@aws-sdk/credential-providers";

const dynamoClient = new DynamoDBClient({
    region: 'us-east-1',
    credentials: fromEnv()
});

const dynamoDocumentClient = DynamoDBDocumentClient.from(dynamoClient);

export {
    dynamoClient,
    dynamoDocumentClient
}