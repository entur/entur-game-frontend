import withSerwistInit from '@serwist/next'

const withSerwist = withSerwistInit({
    swSrc: 'src/app/sw.ts', // where the service worker src is
    swDest: 'public/sw.js', // where the service worker code will end up
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

export default withSerwist(nextConfig)
