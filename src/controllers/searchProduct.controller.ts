import { Request, Response } from "express";
import { searchProductService } from "../services/product/searchProduct.service";

export async function searchProductController(req:Request, res:Response){
    try{
        const query = req.query;

        const products = await searchProductService(query);

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