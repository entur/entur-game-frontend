import NextAuth, { Account, NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'

const {
    AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID,
    NEXTAUTH_SECRET,
} = process.env

//TODO: Fix types for environment variables
const authOptions: NextAuthOptions = {
    providers: [
        AzureADProvider({
            clientId: AZURE_AD_CLIENT_ID ?? 'not set',
            clientSecret: AZURE_AD_CLIENT_SECRET ?? 'not set',
            tenantId: AZURE_AD_TENANT_ID ?? 'not set',
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
    secret: NEXTAUTH_SECRET ?? 'not set',
    debug: true,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
