import { Request, Response } from "express";
import { listProductByBranchService } from "../services/product/listProductByBranch.service";

export async function ListProductByBranchController(req:Request, res:Response){
    try{
        const query = req.query;

        if(query.SKU == undefined){
            res.status(400).json({error: "SKU not provided."})
            return;
        }

        const products = await listProductByBranchService({
            SKU: query.SKU as string,
            branch: query.branch as string | undefined
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