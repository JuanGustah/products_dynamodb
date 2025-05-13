import { Request, Response } from "express";
import { createProductService } from "../services/product/createProduct.service";
import { productBodyValidator } from "../validators/productBody.validator";

export async function CreateProductController(req:Request, res:Response){
    try{
        const productBody = req.body;

        const product = productBodyValidator(productBody);

        await createProductService(product);

        res.status(200).send({
            message: "Product was created successfully!"
        });
    }catch(error){
        if(error instanceof TypeError){
            res.status(400).send({
                "error": error.message
            })
            return;
        }

        res.status(500).send({
            "error": "Something goes wrong"
        })
    }
}