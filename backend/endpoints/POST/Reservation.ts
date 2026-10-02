    import { Router } from "express";
    import postgres from "../../database/postgres/postgres";



    const router = Router();


    router.post("/", async (req, res) => {
        try{
            
            const {
                personal,
                serviceId,
                reservationTermin,
                client
            } = req.body;

            const serviceResult = await postgres.query(
                `
                 SELECT duration_minutes
                 FROM services 
                 WHERE id = $1
                `,
                [serviceId]
            );

            if (serviceResult.rowCount === 0) {
                return res.status(404).json({
                    error: "Service not found!"
                });
            }

            const duration = serviceResult.rows[0].duration_minutes;

            const startTime = new Date(reservationTermin);
            const endTime = new Date(startTime.getTime() + duration * 60000);

            const result = await postgres.query(
                `
                 INSERT INTO reservations
                    (personal_id, service_id, first_name, last_name, email, phone, start_time, end_time)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 returning *
                `,
                [
                    personal, 
                    serviceId,  
                    client.firstName, 
                    client.lastName, 
                    client.email, 
                    client.phone, 
                    startTime, 
                    endTime]
            );

            res.status(201).json({
                message:"Reservation recieved!",
                data: req.body
            });
        } catch (err) {
            res.status(500).json({
                error: "Failed to create reservation!"
            });
        }
    });

    export default router;