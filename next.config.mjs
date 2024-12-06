/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/', // The root path
  //       destination: '/oracle', // The target path
  //       permanent: true, // Set to true for a 308 permanent redirect
  //     },
  //   ]
  // },
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
