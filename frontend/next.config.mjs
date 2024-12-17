/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASEURL: process.env.API_BASEURL,
    WEBSOCKET_URL : process.env.WEBSOCKET_URL,
  }
};

export default nextConfig;
