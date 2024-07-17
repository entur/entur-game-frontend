/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
        AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
        AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
}

export default nextConfig
