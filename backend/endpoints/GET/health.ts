import { Router } from "express";
import postgres from "../../database/postgres/postgres";


const router = Router();

router.get("/", async (req, res) => {
    try{
        await postgres.query("SELECT 1");
        
        res.status(200).json({
            status: "health ok!",
            database: "connected"
        });
    }catch (err){
        console.error("Health check failed! error: ", err);
        
        res.status(500).json({
            status: "Error",
            database: "disconnected"
        });
    }
});

export default router