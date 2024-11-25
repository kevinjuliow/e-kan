import type { NextAuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authorize } from './authorize'

export const AuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'name@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return await authorize(credentials)
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!user) {
        return token
      }

      return {
        ...token,
        accessToken: (user as User & { accessToken?: string }).accessToken,
        id: user.id,
        userType: user.userType,
        name: user.name,
        email: user.email
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          // id: token
          id: token.sub, // put id from user to property id
          name: token.name,
          email: token.email,
          userType: token.userType
        },
        accessToken: token.accessToken,
      }
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // token will be expire in 24 hours
  },
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
}
