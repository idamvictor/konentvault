import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost:3000",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["localhost", "sp.konentvault.net.ng"], // Add localhost and production backend to allowed domains
  },
};

export default nextConfig;
