import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "tejasundeep",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize({ username, password }) {
                if (!username || !password)
                    throw new Error(
                        username
                            ? "Password cannot be empty"
                            : "Username cannot be empty"
                    );

                const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/read?username=${encodeURIComponent(username)}`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );

                if (!res.ok) throw new Error("Invalid email/username");

                const { success, data } = await res.json();

                if (
                    !success ||
                    typeof data !== "object" ||
                    !data ||
                    !(await bcrypt.compare(password, data.password))
                )
                    throw new Error(
                        !success || !data
                            ? "Invalid response from server"
                            : "Invalid password"
                    );

                return data;
            },
        }),
    ],
    jwt: { secret: process.env.JWT_SECRET },
});
