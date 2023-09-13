/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    GOOGLE_LOGIN_URL: process.env.NEXT_PUBLIC_API_URL + '/auth/login/google',
    FACEBOOK_LOGIN_URL:
      process.env.NEXT_PUBLIC_API_URL + '/auth/login/facebook',
    MICROSOFT_LOGIN_URL:
      process.env.NEXT_PUBLIC_API_URL + '/auth/login/microsoft'
  }
}

module.exports = nextConfig
