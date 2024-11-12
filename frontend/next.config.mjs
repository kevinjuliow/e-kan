/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASEURL: process.env.API_BASEURL,
  }
};

export default nextConfig;
