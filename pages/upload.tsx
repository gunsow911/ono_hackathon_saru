import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.item(0));
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>小野地区獣害マッピング</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          写真をアップロードしてください
        </div>
        <input type='file' onChange={onFileInputChange} />
      </main>
    </div>
  )
}
