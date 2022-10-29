import Head from 'next/head'
import MainMap from '../components/MainMap'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>小野地区獣害マッピング</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <MainMap />
      </main>
    </div>
  )
}
