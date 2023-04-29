import React, { useEffect, useState } from 'react'
import { useGeolocated } from 'react-geolocated'
import { useClient } from 'hooks/util/useClient'
import { Alert, Card, Col, Row, Spinner } from 'react-bootstrap'
import Layout from 'components/layouts/MenuLayout'
import { NextPageWithLayout } from '_app'
import { useRouter } from 'next/router'
import useVerifyUser from 'hooks/user/useVerifyUser'
import { LatLng } from 'models/LatLng'
import MatterDetail from 'components/matters/MatterDetail'

const Report: NextPageWithLayout = () => {
  const [location, setLocation] = useState<LatLng>()
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
      <Row>
        <Col>
          <Card className='py-3 px-4'>
            {location && userId ? (
              <MatterDetail initLatLng={location} userId={userId as string} />
            ) : (
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ height: 426 }}
              >
                <Spinner animation='border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

Report.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Report
