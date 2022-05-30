import {SessionProvider} from 'next-auth/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  console.log(process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,process.env.NEXT_PUBLIC_BASE_URL,process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  return(
    <SessionProvider session={session}>
    <Component {...pageProps} />
    </SessionProvider>
    )
}

export default MyApp
