import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/read`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) {
                    return null;
                }

                const { success, data } = await res.json();

                if (!success || !Array.isArray(data)) {
                    return null;
                }

                const user = data.find(
                    (user) => user.username === credentials.username
                );

                if (
                    user &&
                    bcrypt.compareSync(credentials.password, user.password)
                ) {
                    return user;
                }
                return null;
            },
        }),
    ],
    jwt: {
        secret: "MY_SECRET",
    },
});
