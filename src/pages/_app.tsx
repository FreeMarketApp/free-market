import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Router from 'next/router'
import { useSession } from 'next-auth/react'

export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {
        Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )
      }
    </SessionProvider>
      )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  } else if (status === "unauthenticated") {
    Router.replace("/SignIn")
  }

  return children
}