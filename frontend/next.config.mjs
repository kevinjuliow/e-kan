/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASEURL: process.env.API_BASEURL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    WEBSOCKET_URL : process.env.WEBSOCKET_URL,
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
