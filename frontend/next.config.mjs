/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASEURL: process.env.API_BASEURL,
    WEBSOCKET_URL : process.env.WEBSOCKET_URL,
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
