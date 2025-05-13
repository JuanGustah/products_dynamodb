import { Router } from "express";

import { adminRouter } from "./routes/admin.router";
import { productRouter } from "./routes/product.router";

const router = Router();

router.get("/health", (req,res)=>{
    res.status(200).json({
        "status":"OK"
    })
})

router.use("/admin", adminRouter);
router.use(productRouter);

export {router as appRouter};