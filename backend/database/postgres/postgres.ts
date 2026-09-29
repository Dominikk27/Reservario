import { Pool } from "pg";

const postgres = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT)
});

export default postgres;