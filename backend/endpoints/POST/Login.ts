import { Router } from 'express';
import db from '../../database/postgres/postgres';
import bcrypt from 'bcrypt';


const router = Router();

router.post('/', async (req, res) => {
    const { login, password } = req.body;

    try {
        if(!login || !password) {
            return res.status(400).json({ message: 'Login and password are required' });
        }

        const userQuery = await db.query('SELECT * FROM personal_accounts WHERE username = $1 OR email = $1', [login]);
        const user = userQuery.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid login or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid login or password' });
        }

        // If login is successful, you can return user data or a token
        res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export const loginRouter = router;
