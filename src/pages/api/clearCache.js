let cache = {};

export const clearCache = (email) => {
    // Clears the cache for a specific user
    delete cache[email];
}

export default async function clearCacheHandler(req, res) {
    const { email } = req.body;
    clearCache(email);
    res.status(200).json({ message: 'Cache cleared' });
}
