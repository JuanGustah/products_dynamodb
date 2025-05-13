import { PutCommand } from "@aws-sdk/lib-dynamodb";

import { productTableSchema } from "../../config/product-table.schema";
import { dynamoDocumentClient } from "../../infra/dynamo";

import { Product } from "../../models/product.model";

export async function createProductService(product: Product){
    const comand = new PutCommand({
        TableName: productTableSchema.TableName,
        Item: product
    });

    await dynamoDocumentClient.send(comand);
}