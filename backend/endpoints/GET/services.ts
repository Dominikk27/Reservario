import { Router } from "express";
import postgres from "../../database/postgres/postgres";


const router = Router();

router.get("/", async (req, res) =>{
    try{
        const result = await postgres.query("SELECT * FROM services");

        res.status(200).json(result.rows);

    }catch(err){
        console.error("Failed to fetch services! error", err);

        res.status(500).json({
            error: "Failed to fetch data!"
        });
    }
});

export default router