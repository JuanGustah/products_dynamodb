import { QueryCommand } from "@aws-sdk/client-dynamodb";

import { productTableSchema } from "../../config/product-table.schema";
import { dynamoDocumentClient } from "../../infra/dynamo";
import { QueryCommandOutput } from "@aws-sdk/lib-dynamodb";

export interface IlistProduct {
    SKU: string
    branch?: string
}

export async function listProductByBranchService(queryParams: IlistProduct){
    const [keyExpression, attributeValuesSchema] = parseQueryParamsToAttributeValues(queryParams);

    const comand = new QueryCommand({
        TableName: productTableSchema.TableName,
        IndexName: 'BY_BRANCH',
        KeyConditionExpression: keyExpression,
        ExpressionAttributeValues: attributeValuesSchema
    })

    const response = await dynamoDocumentClient.send(comand);
    return parseListProductsResponse(response);
}

function parseQueryParamsToAttributeValues(queryParams: IlistProduct){
    let keyExpression = "SKU = :sku"

    let attributeValues: any = {
        ":sku": {
            S: queryParams.SKU
        }
    };

    if(queryParams.branch){
        attributeValues[':branch'] = {
            S: queryParams.branch
        }

        keyExpression = "SKU = :sku AND branch = :branch"
    }

    return [keyExpression, attributeValues];
}

function parseListProductsResponse(queryResponse: QueryCommandOutput){
    if(queryResponse.Count === 0){
        return {}
    }
    
    const productsResponse = queryResponse.Items;

    const products = productsResponse?.map(item=>{
        const itemKeys = Object.keys(item);
        const product: any = {};

        itemKeys.forEach(key=>{
            const keySchema = item[key];
            const keySchemaType = Object.keys(keySchema)[0];

            if(keySchemaType == "N"){
                product[key] = Number(keySchema["N"]);
            }

            if(keySchemaType == "S"){
                product[key] = keySchema["S"];
            }
        })

        return product;
    })

    return products;
}