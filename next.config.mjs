/** @type {import('next').NextConfig} */
// Free tools are hidden for now; remove a path from this list to bring it back.
const hiddenPaths = [
  "/free-tools",
  "/funnels",
  "/linkedin-funnel",
  "/linkedin-funnel-system",
  "/reel-hooks",
  "/youtube-audit",
  "/ad-roi-calculator",
];

const nextConfig = {
  async redirects() {
    return hiddenPaths.map((source) => ({ source, destination: "/", permanent: false }));
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'anuj4u.in',
      },
    ],
  },
};

export default nextConfig;
