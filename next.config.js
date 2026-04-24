/** @type {import('next').NextConfig} */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
let urlObj;
try {
  urlObj = new URL(baseUrl);
} catch {
  urlObj = new URL("http://localhost:3000");
}

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: urlObj.protocol.replace(":", ""),
        hostname: urlObj.hostname,
        port: urlObj.port || "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
