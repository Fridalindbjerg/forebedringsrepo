/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // ✅ korrekt placering
    domains: ["localhost"], // tillader billeder fra localhost
  },
};

module.exports = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
