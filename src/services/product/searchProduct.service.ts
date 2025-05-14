import { ScanCommand, ScanCommandInput, ScanCommandOutput } from "@aws-sdk/client-dynamodb";

import { dynamoDocumentClient } from "../../infra/dynamo";

import { productTableSchema } from "../../config/product-table.schema";

export interface IlistProduct {
    SKU?: string
    branch?: string
    country?: string
    category?: string
}

export async function searchProductService(queryParams: IlistProduct){
    const scanCommandOptions = parseQueryParamsToFilterExpression(queryParams);

    const comand = new ScanCommand(scanCommandOptions)

    const response = await dynamoDocumentClient.send(comand);
    return parseListProductsResponse(response);
}

function parseQueryParamsToFilterExpression(queryParams: IlistProduct){
    const commandOptions: ScanCommandInput = {
        TableName: productTableSchema.TableName,
    };

    let filterExpression = ""

    let attributeValues: any = {};

    if(queryParams.SKU){
        const prefix = filterExpression.length === 0 ? "" : " AND ";
        filterExpression = filterExpression + prefix + "SKU = :sku"

        attributeValues[':sku'] = {
            S: queryParams.SKU
        }
    }

    if(queryParams.branch){
        const prefix = filterExpression.length === 0 ? "" : " AND ";
        filterExpression = filterExpression + prefix + "branch = :branch"

        attributeValues[':branch'] = {
            S: queryParams.branch
        }
    }

    if(queryParams.country){
        const prefix = filterExpression.length === 0 ? "" : " AND ";
        filterExpression = filterExpression + prefix + "country = :country"

        attributeValues[':country'] = {
            S: queryParams.country
        }
    }

    if(queryParams.category){
        const prefix = filterExpression.length === 0 ? "" : " AND ";
        filterExpression = filterExpression + prefix + "category = :category"

        attributeValues[':category'] = {
            S: queryParams.category
        }
    }

    if(filterExpression.length > 0){
        commandOptions['FilterExpression'] = filterExpression;
        commandOptions['ExpressionAttributeValues'] = attributeValues;
    }

    return commandOptions;
}

function parseListProductsResponse(queryResponse: ScanCommandOutput){
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