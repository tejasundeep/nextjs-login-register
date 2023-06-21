const fs = require("fs");

module.exports = {
    reactStrictMode: false,
    poweredByHeader: false,
    async redirects() {
        const redirectsData = JSON.parse(
            fs.readFileSync("./redirects.json", "utf8")
        );

        const redirects = redirectsData.map(
            ({ source, destination, permanent }) => ({
                source,
                destination,
                permanent,
            })
        );

        return redirects;
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
            };
        }

        return config;
    },
    async rewrites() {
        return [
            {
                source: "/robots.txt",
                destination: "/api/robots",
            },
            {
                source: "/sitemap.xml",
                destination: "/api/sitemap.xml",
            },
        ];
    },
    productionBrowserSourceMaps: true,
};
