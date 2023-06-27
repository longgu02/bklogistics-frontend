/** @type {import('next').NextConfig} */
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

const withNextEnv = nextEnv();
module.exports = withNextEnv({
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.imgur.com",
				// port: '',
				pathname: "/**",
			},
		],
	},
});
