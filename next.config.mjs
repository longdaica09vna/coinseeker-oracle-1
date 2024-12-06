/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    {
      source: '/ecosystem',
      destination: '/',
      permanent: true,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
}

export default nextConfig
