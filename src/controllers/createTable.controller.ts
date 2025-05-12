import { Request, Response } from "express";
import { getTableService } from "../services/aws/getTable.service";
import { productTableSchema } from "../config/product-table.schema";
import { createTableService } from "../services/aws/createTable.service";

export async function CreateTableController(req:Request, res:Response){
    try{
        const tableInfo = await getTableService(productTableSchema.TableName);

        if(tableInfo){
            res.status(400).json({
                "error": "Table already exists!"
            })
            return;
        }

        const table = await createTableService(productTableSchema);
        
        res.status(200).json({
            message: `${table.TableDescription?.TableName} was created successfully!`
        })
    }catch(error){
        res.status(500).send({
            "error": "Something goes wrong"
        })
    }
}