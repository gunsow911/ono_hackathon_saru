import '../styles/globals.css'
import { configure } from 'axios-hooks'
import type { AppProps } from 'next/app'
import axios from '../lib/axios'

export default function App({ Component, pageProps }: AppProps) {
  configure({
    axios,
    defaultOptions: {
      manual: true,
    },
  })
  return <Component {...pageProps} />
}
