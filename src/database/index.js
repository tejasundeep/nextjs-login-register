import mysql from "mysql2/promise";

let pool;

export default function dbConnect() {
    if (!pool) {
        try {
            pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                waitForConnections: true,
                connectionLimit: process.env.DB_CONN_LIMIT || 10, // Allow configurable connection limit
                queueLimit: 0,
            });
        } catch (error) {
            console.error("Error creating database connection pool: ", error);
            throw error;
        }
    }

    return pool;
}
