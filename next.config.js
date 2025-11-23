/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["https://sharp-eager-koi.ngrok-free.app"],
  experimental: {
    // Prevent Prisma from being deployed to Edge environments
    esmExternals: false,
    serverComponentsExternalPackages: ["@prisma/client", "@prisma/adapter-pg"],
  },
};

module.exports = nextConfig;
