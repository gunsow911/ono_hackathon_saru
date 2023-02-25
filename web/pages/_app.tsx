import '../styles/globals.css'
import { configure } from 'axios-hooks'
import type { AppProps } from 'next/app'
import axios from 'libs/axios'
import { SWRConfig } from 'swr'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FunctionComponent, ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const CustomComponent = Component as FunctionComponent

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
      <SWRConfig
        value={{
          fetcher: (url: string) => axios(url).then((r) => r.data),
        }}
      >
        <main>{getLayout(<CustomComponent {...pageProps} />)}</main>
      </SWRConfig>
    </div>
  )
}
