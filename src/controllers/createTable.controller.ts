import { Request, Response } from "express";
import { getTableService } from "../services/aws/getTable.service";
import { productTableSchema } from "../config/product-table.schema";

export async function CreateTableController(req:Request, res:Response){
    try{
        const tableInfo = await getTableService(productTableSchema.TableName);

        if(tableInfo){
            return res.status(400).json({
                "error": "Table already exists!"
            })
        }

        //add service to create table
        
        res.status(200).send();
    }catch(error){
        res.status(500).send({
            "error": "Something goes wrong"
        })
    }
}