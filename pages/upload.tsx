import Head from 'next/head'
import React, {ReactNode, useRef, useState} from 'react';
import styles from '../styles/Home.module.css'
import useUpload from '../hooks/useUpload';

export default function Home() {

  const inputRef = useRef<HTMLInputElement>(null);
  const {upload} = useUpload()

  const [isSuccess, setIsSuccess] = useState<boolean|undefined>(undefined)

  console.log(isSuccess)

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    if (!file) return 
    upload(file).then(() => {
        setIsSuccess(true)
      }).catch(_ => {
        setIsSuccess(false)
      }).finally(() => {
        if (!inputRef.current) return
        inputRef.current.value = ''
      })
  };

  const showResult = (): ReactNode => {
    if (isSuccess === undefined)  return <></>
    if (isSuccess === true) {
      return <div>写真のアップロードが完了しました！</div>
    }
      return <div>写真のアップロードに失敗しました。位置情報の設定がオンであることを確かめてください。</div>
  }

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
        <input type='file' ref={inputRef} onChange={onFileInputChange} />
        {showResult()}
      </main>
    </div>
  )
}
