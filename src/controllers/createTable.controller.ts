import { Request, Response } from "express";

export async function CreateTableController(req:Request, res:Response){
    try{
        const tableInfo = false; // add service if table exists
        

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