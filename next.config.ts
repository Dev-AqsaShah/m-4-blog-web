import type { NextConfig } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
let urlObj: URL;
try {
  urlObj = new URL(baseUrl);
} catch {
  urlObj = new URL("http://localhost:3000");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: urlObj.protocol.replace(":", "") as "http" | "https",
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

export default nextConfig;
