import { Router } from "express";
import { CreateProductController } from "../controllers/createProduct.controller";
import { ListProductByCountryController } from "../controllers/listProductByCountry.controller";
import { ListProductByBranchController } from "../controllers/listProductByBranch.controller";
import { getProductController } from "../controllers/getProduct.controller";
import { searchProductController } from "../controllers/searchProduct.controller";

const productRouter = Router();

productRouter.post("/product", CreateProductController);
productRouter.get("/product/find-by-country", ListProductByCountryController);
productRouter.get("/product/find-by-branch", ListProductByBranchController);
productRouter.get("/product", getProductController);
productRouter.get("/product/search", searchProductController);

export { productRouter };