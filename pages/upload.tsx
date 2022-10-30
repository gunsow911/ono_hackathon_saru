import Head from 'next/head'
import React, { ReactNode, useRef, useState } from 'react';
import styles from '../styles/Home.module.css'
import useUpload from '../hooks/useUpload'
import { Button, Grid, Box, Alert } from '@mui/material';
import Image from "material-ui-image";
import Link from 'next/link';

export default function Home() {

  const inputRef = useRef<HTMLInputElement>(null);
  const { upload } = useUpload()

  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined)

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
    if (isSuccess === undefined) return <></>
    if (isSuccess === true) {
      return <Alert severity="success">写真のアップロードが完了しました！</Alert>
    }
    return <Alert severity="error">写真のアップロードに失敗しました。位置情報の設定がオンであることを確かめてください。</Alert>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>小野地区獣害マッピング</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid container alignItems='center' justifyContent='center' direction="column">
          <Grid item xs={12}>
            <p>位置情報のある写真を選択してください</p>
            <Image src="/image/saru_photo.png" width={100} height={100} alt="" />
          </Grid>
          <Grid item xs={12}>
            <Box pt={3}>
              <Button style={{ color: 'white', backgroundColor: '#1E90FF' }}>
                写真をアップロードしてください
                <input type="file" className={styles.inputFileBtnHide} onChange={onFileInputChange} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              {showResult()}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined">
                <Link href="/" passHref>
                  獣害Mapに移動
                </Link>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div >
  )
}
