/** @type {import('next').NextConfig} */
const nextConfig = {
  // টাইপস্ক্রিপ্ট এরর থাকলেও বিল্ড থামাবে না
  typescript: {
    ignoreBuildErrors: true,
  },
  // এইসলিট এরর থাকলেও বিল্ড থামাবে না
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
