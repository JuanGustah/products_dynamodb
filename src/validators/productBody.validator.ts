import { Product } from "../models/product.model"

export function productBodyValidator(productBody: any): Product{
    if(
        !productBody?.SKU || 
        !productBody?.category ||
        !productBody?.branch ||
        !productBody?.country
    ){
        throw TypeError("Product Invalid")
    }

    return {
        SKU: productBody.SKU,
        category: productBody.category,
        branch: productBody.branch,
        country: productBody.country,
        name: productBody?.name,
        description: productBody?.description,
        quantity: productBody?.quantity,
        price: productBody?.price
    }
}