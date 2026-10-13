import { Router } from "express";
import postgres from "../../database/postgres/postgres";

const router = Router();

router.get("/", async (req, res) => {
    try{
        const result = await postgres.query(`
            SELECT p.id, p.first_name, p.last_name 
            FROM personal p 
            JOIN roles r ON p.role_id = r.id
            WHERE r.name = 'employee'
        `);

        res.status(200).json(result.rows);

    }catch (err){
        console.error("Failed to fetch personal! error: ", err);

        res.status(500).json({
            status: "Error"
        });
    }
});

export default router;