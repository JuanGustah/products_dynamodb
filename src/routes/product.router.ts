import { Router } from "express";
import { CreateProductController } from "../controllers/createProduct.controller";
import { ListProductByCountryController } from "../controllers/listProductByCountry.controller";

const productRouter = Router();

productRouter.post("/product", CreateProductController);
productRouter.get("/product/find-by-country", ListProductByCountryController);

export { productRouter };