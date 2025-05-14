import { Request, Response } from "express";

import { removeProductService } from "../services/product/removeProduct.service";

export async function removeProductController(req:Request, res:Response){
    try{
        const body = req.body;

        if(body.SKU == undefined){
            res.status(400).json({error: "SKU not provided."})
            return;
        }

        if(body.country == undefined){
            res.status(400).json({error: "country not provided."})
            return;
        }

        await removeProductService({
            SKU: body.SKU as string,
            country: body.country as string
        });

        res.status(200).json({
            message: 'Product deleted successfully',
        });
    }catch(error){
        res.status(500).send({
            "error": "Something goes wrong"
        });
    }
}