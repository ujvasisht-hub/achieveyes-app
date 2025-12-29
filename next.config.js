/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/app',
  // Important: This makes the app work under achieveyes.com/app
  // All routes will automatically be prefixed with /app
}

module.exports = nextConfig
