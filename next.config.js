/** @type {import('next').NextConfig} */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const urlObj = new URL(baseUrl);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Extract protocol (without the colon)
        protocol: urlObj.protocol.replace(":", ""),
        // Extract the hostname
        hostname: urlObj.hostname,
        // Use port if available
        port: urlObj.port || "",
        // Allow any path
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
