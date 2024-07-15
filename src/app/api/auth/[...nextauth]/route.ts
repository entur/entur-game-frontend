import NextAuth, { NextAuthOptions, User } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'

const {
    AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID,
    NEXTAUTH_SECRET,
} = process.env

if (
    !AZURE_AD_CLIENT_ID ||
    !AZURE_AD_CLIENT_SECRET ||
    !AZURE_AD_TENANT_ID ||
    !NEXTAUTH_SECRET
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
        async jwt({ token, user }: { token: JWT; user: User }) {
            if (user) {
                token.accessToken = user.accessToken
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.accessToken = token.accessToken
            }
            return session
        },
    },
    secret: NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
