import express, {type Express, type Request, type Resposne} from 'express';
import cors from "cors";

import "dotenv/config"

import postgres from './database/postgres/postgres';

// ENDPOINTS
import healthRouter from "./endpoints/GET/health";
import serviceFetch from "./endpoints/GET/services";
import personalFetch from "./endpoints/GET/personal";
import workingHoursFetch from "./endpoints/GET/working-hours";

import sendReservation from "./endpoints/POST/Reservation";

import { loginRouter } from "./endpoints/POST/Login";
import { createAdmin } from "./scripts/createAdmin";


const startServer = async () => {
    await createAdmin();


    const app: Express = express();
    app.use(cors());
    app.use(express.json());
    const port = 3000;


    app.use("/api/health", healthRouter);
    app.use("/api/getServices", serviceFetch);
    app.use("/api/getPersonal", personalFetch);
    app.use("/api/working-hours", workingHoursFetch);

    app.use("/api/sendReservation", sendReservation);

    app.use("/login", loginRouter);


    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

startServer().catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
});