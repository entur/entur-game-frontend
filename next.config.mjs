const nextConfig = {
  output: 'standalone',
  experimental: {
    instrumentationHook: true,
  },
  compiler: {
    removeConsole: false,
  },
}

export default nextConfig