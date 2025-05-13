import { Router } from "express";
import { CreateProductController } from "../controllers/createProduct.controller";

const productRouter = Router();

productRouter.post("/product", CreateProductController);

export { productRouter };