import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'
import * as path from 'path'

export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), svgrPlugin(), VitePWA()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
    server: {
        port: 3000,
        host: true,
        open: true,
    },
})
