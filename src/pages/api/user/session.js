import { parse } from "useragent";
import { getSession } from "next-auth/react";

let cache = {};

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });
        const userAgent = parse(req.headers['user-agent']);
        const email = req.headers['email'];

        if (session) {
            if (cache[email] && Date.now() - cache[email].cacheTime < 60 * 60 * 1000) {
                cache[email].data['os'] = userAgent.os.family;
                cache[email].data['browser'] = userAgent.family;
                res.status(200).json(cache[email].data);
            } else {
                const response = await fetch('http://ip-api.com/json/');

                if (!response.ok) {
                    throw new Error('Fetch error - Status ' + response.status);
                }

                const data = await response.json();
                data['os'] = userAgent.os.family;
                data['browser'] = userAgent.family;
                
                cache[email] = {data: data, cacheTime: Date.now()};

                res.status(200).json(data);
            }
        } else {
            res.status(401).json({ error: 'Not authorized' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching IP address' });
    }
}
