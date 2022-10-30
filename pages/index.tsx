import dynamic from 'next/dynamic';
import Head from 'next/head'
import React from 'react';
import Descirption from '../components/Description';
import styles from '../styles/Home.module.css'

export default function Home() {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("../components/MainMap"), {
        loading: () => <p>地図をロード中です…</p>,
        ssr: false,
      }),
    []
  );
  return (
    <div className={styles.container}>
      <Head>
        <title>小野地区獣害マッピング</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Map />
        <Descirption />
      </main>
    </div>
  )
}
