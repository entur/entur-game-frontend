// eslint-disable-next-line @typescript-eslint/no-var-requires
const runtimeCaching = require('next-pwa/cache')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
    dest: 'public',
    cacheOnFrontEndNav: true,
    register: true,
    skipWaiting: true,
    reloadOnOnline: true,
    runtimeCaching,
})

const nextConfig = {
    output: 'standalone',
    experimental: {
        instrumentationHook: true,
    },
    compiler: {
        removeConsole: false,
    },
}

export default withPWA(nextConfig)
