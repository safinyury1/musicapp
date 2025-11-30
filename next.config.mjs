/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ncsmusic.s3.eu-west-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ncsmusic.s3.eu-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
