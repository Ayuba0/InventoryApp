import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json(results);
    });
});

export default router;
