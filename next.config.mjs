const nextConfig = {
  output: 'standalone',
  experimental: {
    instrumentationHook: true,
  },
  compiler: {
    removeConsole: false,
  },
  async rewrites() {
    console.log('process.env.apiUrl', process.env.apiUrl)
    return [
      {
        source: '/api/auth/:path*',
        destination: `/api/auth/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/:path*`,
      },
    ]
  },
}

export default nextConfig