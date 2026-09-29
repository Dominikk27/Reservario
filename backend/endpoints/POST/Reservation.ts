    import { Router } from "express";



    const router = Router();


    router.post("/", (req, res) => {
        try{
            
            const {
                personal,
                serviceId,
                reservationTermin,
                client
            } = req.body;

            console.log(client);

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