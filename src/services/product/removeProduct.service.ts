import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";

import { dynamoDocumentClient } from "../../infra/dynamo";

import { productTableSchema } from "../../config/product-table.schema";

export interface IlistProduct {
    SKU: string
    country: string
}

export async function removeProductService(queryParams: IlistProduct){
    const inputKey = parseQueryParamsToInputKeys(queryParams);

    const comand = new DeleteItemCommand({
        TableName: productTableSchema.TableName,
        Key: inputKey
    })

    await dynamoDocumentClient.send(comand);
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