import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import axios from 'axios'

export const AuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'name@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) { // if there is no credentials
          return null;
        }
        try {
          console.log(`ENV URL: ${process.env.NEXT_DEV_API_BASEURL}`)
          const response = await axios.post(`${process.env.NEXT_DEV_API_BASEURL}/api/auth/pembeli/login`, {
            email: credentials.email,
            password: credentials.password,
          })
          console.log(response.data)

          // Cek jika login berhasil dan menerima token
          const { token } = response.data;
          if (token) {
            // Return user dengan token sebagai bagian dari objek user
            return { accessToken: token };
          }
          return null
        } catch (error: any) {
          throw new Error(error);
        }
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
        id: user.id
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          // id: token
          id: token.sub // put id from user to property id
        }
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
