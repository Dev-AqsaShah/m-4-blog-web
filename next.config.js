/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**", // Adjust based on your image path
      },
    ],
  },
};

module.exports = nextConfig;
