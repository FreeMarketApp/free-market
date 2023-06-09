import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { user } from "@prisma/client"
require('dotenv').config()


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/server`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
        })
        const user = await res.json()
        if (res.ok && user) {
          console.log(user.username)
          return user
        }
        return null
      }
    })
  ], pages: {
    signIn: "/SignIn"
  }, session: {
    strategy: "jwt"
  },
    jwt: {
      secret: "secret"
    },
    callbacks: {
      async session({ session, token }) {
        session.user = token.user;
        return session;
      },
      async jwt({ token, user}) {
        if (user) {
          token.user = user;
        }
        return token;
      }
    }
}
export default NextAuth(authOptions)