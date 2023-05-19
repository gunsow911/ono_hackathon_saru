import React, { useEffect, useState } from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import { Alert, Card, Col, Row, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { LatLng } from 'models/LatLng'
import { useGeolocated } from 'react-geolocated'
import { useClient } from 'hooks/util/useClient'
import MatterNew from 'components/consoles/matters/MatterNew'
import { Matter } from 'models/Matter'

const ConsoleMatterNew: NextPageWithLayout = () => {
  const [location, setLocation] = useState<LatLng>()
  const router = useRouter()

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

  const onCreate = (matter: Matter) => {
    // 一覧ページにリダイレクトする
    router.replace('/console/matters/')
  }

  return (
    <>
      <Row>
        <Col>
          <h3>獣害情報新規作成</h3>
        </Col>
      </Row>
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
              {location ? (
                <MatterNew initLatLng={location} onCreate={onCreate} />
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
    </>
  )
}

ConsoleMatterNew.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleMatterNew
