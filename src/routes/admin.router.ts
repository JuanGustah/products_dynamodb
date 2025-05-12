import { Router } from "express";
import { CreateTableController } from "../controllers/createTable.controller";

const adminRouter = Router();

adminRouter.post("/create-table", CreateTableController);

export { adminRouter };