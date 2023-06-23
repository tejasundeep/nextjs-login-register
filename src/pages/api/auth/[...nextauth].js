import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcrypt";
import dbConnect from "@/database";

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const pool = dbConnect();
                    const [rows] = await pool.query(
                        "SELECT * FROM users WHERE username = ?",
                        [credentials.username]
                    );

                    if (rows.length > 0) {
                        const user = rows[0];
                        const isValid = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (isValid) {
                            // We could return the whole user object here, but it might be more secure
                            // to return only the necessary info
                            return {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                            };
                        } else {
                            // Invalid password
                            throw new Error("Invalid password");
                        }
                    } else {
                        // User not found
                        throw new Error("User not found");
                    }
                } catch (error) {
                    console.error(error);
                    throw new Error("An error occurred during authentication");
                }
            },
        }),
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session(session, token) {
            session.user.id = token.id;
            return session;
        },
    },
});
