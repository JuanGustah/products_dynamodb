import { QueryCommand } from "@aws-sdk/client-dynamodb";

import { productTableSchema } from "../../config/product-table.schema";
import { dynamoDocumentClient } from "../../infra/dynamo";

export interface IlistProduct {
    SKU: string
    country?: string
}

export async function listProductByCountryService(queryParams: IlistProduct){
    const [keyExpression, attributeValuesSchema] = parseQueryParamsToAttributeValues(queryParams);

    const comand = new QueryCommand({
        TableName: productTableSchema.TableName,
        KeyConditionExpression: keyExpression,
        ExpressionAttributeValues: attributeValuesSchema
    })

    const response = await dynamoDocumentClient.send(comand);
    return response.Items;
}

function parseQueryParamsToAttributeValues(queryParams: IlistProduct){
    let keyExpression = "SKU = :sku"

    let attributeValues: any = {
        ":sku": {
            S: queryParams.SKU
        }
    };

    if(queryParams.country){
        attributeValues[':country'] = {
            S: queryParams.country
        }

        keyExpression = "SKU = :sku AND country = :country"
    }

    return [keyExpression, attributeValues];
}
