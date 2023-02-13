import Head from 'next/head'
import React, { ReactNode, useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'
import { Button, Grid, Box, Alert } from '@mui/material'
import Link from 'next/link'
import { useGeolocated } from 'react-geolocated'
import { NoSsr } from '@material-ui/core'
import UploadMap from '../../components/UploadMap'
import useAddMatter from '../../hooks/useAddMatter'
import useAxios from 'axios-hooks'

export default function Upload() {
  useAxios<void>(
    {
      url: '/sanctum/csrf-cookie',
      method: 'GET',
    },
    { manual: false },
  )
  const [location, setLocation] = useState<{ lat: number; lng: number }>()

  const { data, execute, loading, error } = useAddMatter()

  const {
    coords,
    isGeolocationEnabled,
    isGeolocationAvailable,
    positionError,
  } = useGeolocated()

  useEffect(() => {
    if (!coords) return
    setLocation({ lat: coords.latitude, lng: coords.longitude })
  }, [coords])

  // GPSが取れない場合は小野周辺に位置を設定
  useEffect(() => {
    if (positionError) {
      setLocation({ lat: 34.1046934, lng: 131.3046877 })
    }
  }, [positionError])

  const onClick = () => {
    if (!location) return
    execute({ lat: location.lat, lng: location.lng })
  }

  const showResult = (): ReactNode => {
    if (data === undefined) return <></>
    if (error !== null) {
      return (
        <Alert severity='error'>
          報告に失敗しました。インターネットの接続や位置情報の設定がオンであることを確かめてください。
        </Alert>
      )
    }
    if (data && !loading) {
      return <Alert severity='success'>報告が完了しました！</Alert>
    }
    return <></>
  }

  const onChangeLocation = (lat: number, lng: number) => {
    setLocation({ lat, lng })
  }

  const isDisable = () => {
    return (
      !isGeolocationAvailable || !isGeolocationEnabled || !location || loading
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>小野地区獣害マッピング</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          direction='column'
        >
          <NoSsr>
            {!isGeolocationAvailable && (
              <Box pt={3}>
                <Alert severity='error'>
                  位置情報取得ができないブラウザです。別のブラウザをお試しください。
                </Alert>
              </Box>
            )}
            {isGeolocationAvailable && !isGeolocationEnabled && (
              <Box pt={3}>
                <Alert severity='warning'>
                  位置情報を取得できませんでした。位置情報へのアクセスを許可してください。
                </Alert>
              </Box>
            )}
            <>
              <Box pt={2}>獣害を受けた場所を選択してください</Box>
              <Box pt={1}>
                {location ? (
                  <UploadMap
                    latLng={{ ...location }}
                    onChangeLocation={onChangeLocation}
                  />
                ) : (
                  <Box style={{ width: 400, height: 300 }}></Box>
                )}
              </Box>
              <Box pt={1}>
                {location && (
                  <>
                    <div>緯度： {location.lng}</div>
                    <div>経度： {location.lat}</div>
                  </>
                )}
              </Box>
            </>
            {data === undefined && (
              <Box pt={3}>
                <Button
                  disabled={isDisable()}
                  style={{
                    color: 'white',
                    backgroundColor: '#1E90FF',
                  }}
                  onClick={onClick}
                >
                  {loading ? <>報告中…</> : <>獣害報告！</>}
                </Button>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>{showResult()}</Box>
            <Box sx={{ mt: 2 }}>
              <Button variant='outlined'>
                <Link href='/' passHref>
                  獣害Mapに移動
                </Link>
              </Button>
            </Box>
          </NoSsr>
        </Grid>
      </main>
    </div>
  )
}
