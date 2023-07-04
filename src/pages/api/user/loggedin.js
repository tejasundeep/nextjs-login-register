import { getSession } from "next-auth/react";
import bcrypt from "bcryptjs";

let cache = {};

const getUserData = async (email, hash) => {
    const url = new URL(`${process.env.NEXTAUTH_URL}/api/user/read`);
    url.searchParams.append('username', email);
    url.searchParams.append('key', hash);

    const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error('Fetch error - Status ' + response.status);
    }

    const data = await response.json();

    return data.data;
}

export default async (req, res) => {
    try {
        const session = await getSession({ req });

        if (!session) {
            throw new Error("Not authorized");
        }

        const email = session.user.email;
        const hash = await bcrypt.hash("secret", 10);

        if (cache[email] && Date.now() - cache[email].cacheTime < 60 * 60 * 1000) {
            res.status(200).json(cache[email].data);
        } else {
            const response = await getUserData(email, hash);
            cache[email] = {data: response, cacheTime: Date.now()};
            res.status(200).json(response);
        }
    } catch (error) {
        const statusCode = error.message === 'Not authorized' ? 401 : 500;
        res.status(statusCode).json({ error: error.message });
    }
};
