/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.29', '10.145.79.155', "*"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: "export"
};

export default nextConfig;
