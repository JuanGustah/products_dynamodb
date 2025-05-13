import { Request, Response } from "express";
import { productBodyValidator } from "../validators/productBody.validator";

export async function CreateProductController(req:Request, res:Response){
    try{
        const productBody = req.body;

        const product = productBodyValidator(productBody);

        //call service

        res.status(200).send({
            message: "Product was created successfully!"
        });
    }catch(error){
        res.status(500).send({
            "error": "Something goes wrong"
        })
    }
}