import '../styles/globals.css'
import { configure } from 'axios-hooks'
import type { AppProps } from 'next/app'
import axios from '../lib/axios'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App({ Component, pageProps }: AppProps) {
  configure({
    axios,
    defaultOptions: {
      manual: true,
    },
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>小野地区獣害マッピング</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
