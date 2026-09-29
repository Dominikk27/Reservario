import { Router } from "express";
import postgres from "../../database/postgres/postgres";

const router = Router();


router.get("/:personalID", async (req, res) => {
    try{
        const personalID = req.params.personalID
        const working_hours_result = await postgres.query(
            `SELECT * 
             FROM working_hours 
             WHERE personal_id = $1 
             ORDER BY day_of_week, start_time`,
            [personalID]
        );

        const breaks_hours_result = await postgres.query(
            `SELECT * 
             FROM working_breaks
             WHERE personal_id = $1
             ORDER BY day_of_week, start_time`,
             [personalID]
        );

        const workingHours = working_hours_result.rows.map(work => ({
            ...work,

            breaks: breaks_hours_result.rows
                .filter(workBreak =>
                    workBreak.day_of_week === work.day_of_week
                )
                .map(workBreak =>({
                    id: workBreak.id,
                    start_time: workBreak.start_time,
                    end_time: workBreak.end_time
                }))
        }))

        res.status(200).json(workingHours);
    }catch(err){
        console.error("Failed to fetch working data! error", err);

        res.status(500).json({
            error: "Failed to fetch data!"
        });
    }
});

export default router