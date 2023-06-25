import dbConnect from "@/database";

export default async function handler(req, res) {
    try {
        // Connect to the database
        const pool = await dbConnect();

        // Fetch user data
        const [users] = await pool.query("SELECT * FROM users"); // Assuming your table name is 'users'

        // Send the user data as the API response
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
