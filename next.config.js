/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
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



// /** @type {import('next').NextConfig} */

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
// const urlObj = new URL(baseUrl);

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         // Your existing BASE_URL pattern (local + Vercel)
//         protocol: urlObj.protocol.replace(":", ""),
//         hostname: urlObj.hostname,
//         port: urlObj.port || "",
//         pathname: "/**",
//       },
//       {
//         // Allow Cloudinary images
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;
