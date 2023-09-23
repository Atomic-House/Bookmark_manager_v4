/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "variety.com",
      },
      {
        protocol: "https",
        hostname: "githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
      },
    ],
  },
};

module.exports = nextConfig;
