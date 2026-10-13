import db from "../database/postgres/postgres";
import bcrypt from "bcrypt";


const createAdmin = async () => {
    const adminUsername = "admin";
    const adminEmail = null;
    const adminPassword = "admin";

    try{
        const existingAdmin = await db.query(
            `
            SELECT id
            FROM personal_accounts
            WHERE username = $1
            `,
            [adminUsername]
        );

        if (existingAdmin.rows.length > 0) {
            console.log("Admin account already exists.");
            return;
        }

        const roleQuery = `
            SELECT id FROM roles WHERE name = 'admin'
        `;

        const adminRoleResult = await db.query(roleQuery);
        if (adminRoleResult.rows.length === 0) {
            console.error("Admin role not found in the database.");
            return;
        }

        const adminRoleId = adminRoleResult.rows[0].id;

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

        const query = `
            INSERT INTO personal_accounts (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id
        `;

        const accountResult = await db.query(query, [adminUsername, adminEmail, hashedPassword]);
        const accountId = accountResult.rows[0].id;

        const personalQuery = `
            INSERT INTO personal (account_id, first_name, last_name, role_id)
            VALUES ($1, $2, $3, $4)
        `;

        await db.query(personalQuery, [accountId, "Admin", "Admin", adminRoleId]);

    } catch (err) {
        console.error("Error creating admin user:", err);
    }

}


export { createAdmin };



