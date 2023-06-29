import { getSession } from "next-auth/react";
import bcrypt from "bcryptjs";

const getUserData = async (email, hash) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/read`);
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

        const hash = await bcrypt.hash("secret", 10);
        const response = await getUserData(session.user.email, hash);

        res.status(200).json({ response });
    } catch (error) {
        const statusCode = error.message === 'Not authorized' ? 401 : 500;
        res.status(statusCode).json({ error: error.message });
    }
};
