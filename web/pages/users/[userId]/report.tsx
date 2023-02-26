import React, { ReactNode, useEffect, useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import useAddMatter from 'hooks/matter/useAddMatter'
import UploadMap from 'components/maps/UploadMap'
import { useClient } from 'hooks/util/useClient'
import { Alert, Button } from 'react-bootstrap'
import Layout from 'components/layouts/MenuLayout'
import { NextPageWithLayout } from '_app'
import { useRouter } from 'next/router'
import useVerifyUser from 'hooks/user/useVerifyUser'

const Report: NextPageWithLayout = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>()
  const { data, execute, loading, error } = useAddMatter()
  const router = useRouter()
  const { userId } = router.query
  const { verify, isVerify } = useVerifyUser()

  useEffect(() => {
    if (userId === undefined) return
    verify(userId as string)
  }, [userId])

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
    if (!userId) return
    execute(userId as string, { lat: location.lat, lng: location.lng })
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

  console.log(isVerify)

  if (isVerify === undefined) {
    // ユーザ確認中
    return <></>
  }
  if (isVerify === false) {
    // 存在しないユーザ
    // 404ページにリダイレクト
    router.replace('/404')
    return <></>
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
      <div className='d-flex justify-content-center'>
        <Button disabled={isDisable()} onClick={onClick}>
          {loading ? <>報告中…</> : <>獣害報告！</>}
        </Button>
      </div>
      <div>{showResult()}</div>
    </div>
  )
}

Report.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Report
