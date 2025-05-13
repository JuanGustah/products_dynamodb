import { Request, Response } from "express";

export async function ListProductByCountryController(req:Request, res:Response){
    try{
        const query = req.query;

        //call service

        res.status(200).json({
            message: 'success',
            data: []
        });
    }catch(error){
        res.status(500).send({
            "error": "Something goes wrong"
        });
    }
}