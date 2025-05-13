import { Router } from "express";
import { CreateProductController } from "../controllers/createProduct.controller";
import { ListProductByCountryController } from "../controllers/listProductByCountry.controller";
import { ListProductByBranchController } from "../controllers/listProductByBranch.controller";

const productRouter = Router();

productRouter.post("/product", CreateProductController);
productRouter.get("/product/find-by-country", ListProductByCountryController);
productRouter.get("/product/find-by-branch", ListProductByBranchController);

export { productRouter };