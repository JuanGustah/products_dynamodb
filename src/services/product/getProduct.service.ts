import { GetItemCommand } from "@aws-sdk/client-dynamodb";

import { dynamoDocumentClient } from "../../infra/dynamo";

import { productTableSchema } from "../../config/product-table.schema";

export interface IlistProduct {
    SKU: string
    country: string
}

export async function getProductService(queryParams: IlistProduct){
    const inputKey = parseQueryParamsToInputKeys(queryParams);

    const comand = new GetItemCommand({
        TableName: productTableSchema.TableName,
        Key: inputKey
    })

    const response = await dynamoDocumentClient.send(comand);
    return response;
}

function parseQueryParamsToInputKeys(queryParams: IlistProduct){
    let inputKey = {
        SKU:{
            S: queryParams.SKU
        },
        country:{
            S: queryParams.country
        }
    };

    return inputKey;
}