import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'
import {ExifParserFactory} from "ts-exif-parser";
import useAddHeatmapData from '../hooks/useAddHeatmapData';

export default function Home() {

  const {postData} = useAddHeatmapData()

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
        <div>
          写真をアップロードしてください
        </div>
        <input type='file' onChange={onFileInputChange} />
      </main>
    </div>
  )
}
