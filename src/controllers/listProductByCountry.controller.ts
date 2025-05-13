import { Request, Response } from "express";
import { listProductByCountryService } from "../services/product/listProductByCountry.service";

export async function ListProductByCountryController(req:Request, res:Response){
    try{
        const query = req.query;

        if(query.SKU == undefined){
            res.status(400).json({error: "SKU not provided."})
            return;
        }
        
        const products = await listProductByCountryService({
            SKU: query.SKU as string,
            country: query.country as string | undefined
        });

        res.status(200).json({
            message: 'success',
            data: products
        });
    }catch(error){
        res.status(500).send({
            "error": "Something goes wrong"
        });
    }
}