import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'
import { ExifParserFactory } from "ts-exif-parser";
import useAddHeatmapData from '../hooks/useAddHeatmapData';
import { Button, Grid, Box, Avatar, Paper } from '@mui/material';
import SaruPhoto from '../public/image/saru_photo.png';
import Image from "material-ui-image";

export default function Home() {

  const { postData } = useAddHeatmapData()

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    if (!file) return
    file.arrayBuffer().then((value) => {
      const exifData = ExifParserFactory.create(value).parse()
      const lat = exifData.tags?.GPSLatitude
      const lng = exifData.tags?.GPSLongitude
      const date = exifData.tags?.DateTimeOriginal ? new Date(exifData.tags?.DateTimeOriginal) : undefined
      if (!lat || !lng || !date) return
      postData(lat.toString(), lng.toString(), date.toString())
    });

  };
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
              <Button
                style={{ color: 'white', backgroundColor: 'blue' }}
                component="label"
              >
                写真をアップロードしてください
                <input type="file" className={styles.inputFileBtnHide} onChange={onFileInputChange} />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div >
  )
}
