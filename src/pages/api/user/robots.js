export default function handler(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.write("User-agent: *\n");
    res.write("Disallow: \n");
    res.write("Sitemap: https://blog.cryptoforce.in/sitemap.xml");
    res.end();
}
