import { Request, Response } from "express";

import { getProductService } from "../services/product/getProduct.service";

export async function getProductController(req:Request, res:Response){
    try{
        const query = req.query;

        if(query.SKU == undefined){
            res.status(400).json({error: "SKU not provided."})
            return;
        }

        if(query.country == undefined){
            res.status(400).json({error: "country not provided."})
            return;
        }

        const products = await getProductService({
            SKU: query.SKU as string,
            country: query.country as string 
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