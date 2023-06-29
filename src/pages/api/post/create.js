import dbConnect from "@/database";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, postText } = req.body;
        const pool = await dbConnect();

        try {
            const [result] = pool.query(
                'INSERT INTO posts (userid, text) VALUES (?, ?)',
                [userId, postText]
            );

            res.status(200).json({ id: result.insertId });
        } catch (error) {
            console.error('Error inserting post into MySQL:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
