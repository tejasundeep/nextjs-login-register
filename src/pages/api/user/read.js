import dbConnect from "@/database";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    try {
        const pool = await dbConnect();
        const { username, key } = req.query;

        const isMatch = await bcrypt.compare('secret', key);

        if(isMatch) {
            const [
                users,
            ] = await pool.query("SELECT * FROM users WHERE username = ? or email = ? or phone = ?", [
                username, username, username
            ]);

            if (users.length === 0) {
                res.status(404).json({ success: false, message: "User not found" });
                return;
            }

            res.status(200).json({ success: true, data: users[0] });
        } else {
            res.status(403).json({ success: false, message: "Unauthorized access" });
            return;
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
