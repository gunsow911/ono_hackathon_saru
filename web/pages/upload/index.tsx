import React, { ReactNode, useEffect, useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import useAddMatter from '../../hooks/useAddMatter'
import useAxios from 'axios-hooks'
import UploadMap from '../../components/UploadMap'
import Link from 'next/link'
import { useClient } from '../../hooks/useClient'
import { Alert, Button } from 'react-bootstrap'

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

  const isClient = useClient()

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
        <Alert variant='danger'>
          報告に失敗しました。インターネットの接続や位置情報の設定がオンであることを確かめてください。
        </Alert>
      )
    }
    if (data && !loading) {
      return <Alert variant='success'>報告が完了しました！</Alert>
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
    <div>
      {isClient && !isGeolocationAvailable && (
        <div className='d-flex justify-content-center'>
          <Alert variant='warning'>
            位置情報取得ができないブラウザです。別のブラウザをお試しください。
          </Alert>
        </div>
      )}
      {isClient && isGeolocationAvailable && !isGeolocationEnabled && (
        <div className='d-flex justify-content-center'>
          <Alert variant='warning'>
            位置情報を取得できませんでした。位置情報へのアクセスを許可してください。
          </Alert>
        </div>
      )}
      <>
        <div className='d-flex justify-content-center'>
          獣害を受けた場所を選択してください
        </div>
        <div className='d-flex justify-content-center'>
          {location ? (
            <UploadMap
              latLng={{ ...location }}
              onChangeLocation={onChangeLocation}
            />
          ) : (
            <div style={{ width: 400, height: 300 }}></div>
          )}
        </div>
        <div className='d-flex justify-content-center'>
          {location && (
            <>
              <div>緯度： {location.lng}</div>
              <div>経度： {location.lat}</div>
            </>
          )}
        </div>
      </>
      {data === undefined && (
        <div className='d-flex justify-content-center'>
          <Button disabled={isDisable()} onClick={onClick}>
            {loading ? <>報告中…</> : <>獣害報告！</>}
          </Button>
        </div>
      )}
      <div>{showResult()}</div>
      <div className='d-flex justify-content-center'>
        <Link href='/' passHref>
          <Button variant='link'>獣害マップに移動</Button>
        </Link>
      </div>
    </div>
  )
}
