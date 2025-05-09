import { Router } from "express";

const router = Router();

router.get("/health", (req,res)=>{
    res.send(200).json({
        "status":"OK"
    })
})

export {router as appRouter};