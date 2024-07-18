import NextAuth, { Account, NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'

const {
    AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID,
    NEXTAUTH_SECRET,
    NEXTAUTH_URL,
} = process.env

if (
    !AZURE_AD_CLIENT_ID ||
    !AZURE_AD_CLIENT_SECRET ||
    !AZURE_AD_TENANT_ID ||
    !NEXTAUTH_SECRET ||
    !NEXTAUTH_URL
) {
    throw new Error('The Azure AD environment variables are not set.')
}

export const authOptions: NextAuthOptions = {
    providers: [
        AzureADProvider({
            clientId: AZURE_AD_CLIENT_ID,
            clientSecret: AZURE_AD_CLIENT_SECRET,
            tenantId: AZURE_AD_TENANT_ID,
        }),
    ],
    callbacks: {
        async jwt({ token, account }: { token: JWT; account: Account | null }) {
            if (account) {
                token = Object.assign({}, token, {
                    access_token: account.access_token,
                })
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session) {
                session = Object.assign({}, session, {
                    access_token: token.access_token,
                })
            }
            return session
        },
    },
    secret: NEXTAUTH_SECRET,
    debug: true,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
