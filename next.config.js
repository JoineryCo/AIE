/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true, // Add this line to ignore TypeScript errors
    },
  };
  
  module.exports = nextConfig;