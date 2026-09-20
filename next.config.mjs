/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.29', '10.145.79.155', "*"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.discogs.com',
      },
      {
        protocol: 'https',
        hostname: 'ndsjagxakzjuniavktgn.supabase.co', 
        pathname: '/storage/v1/object/public/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/image-proxy',
      },
      {
        pathname: '/**'
      }
    ],
  },
  // output: "export"
};

export default nextConfig;