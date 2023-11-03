/** @type {import('next').NextConfig} */
// const {118n} = require('./next-118next.config');

const nextConfig = {
  reactStrictMode:true,
  swcMinify:true,
}

module.exports = {
  ...nextConfig,
  api:{
    externalResolver:true
  },
  images: {
      domains: ['cdn.sanity.io']
    }
}
