import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import { Alert, Col, Row } from 'react-bootstrap'

import MatterDetail from 'components/consoles/matters/MatterDetail'
import useGetMatter from 'hooks/console/matter/useGetMatter'
import { useRouter } from 'next/router'
import { useGeolocated } from 'react-geolocated'
import { useClient } from 'hooks/util/useClient'

const ConsoleMatterDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const { matterId } = router.query
  const { data: matter, mutate } = useGetMatter(matterId as string | undefined)
  const { isGeolocationEnabled, isGeolocationAvailable } = useGeolocated()

  const isClient = useClient()

  const onRemove = () => {
    // 一覧ページにリダイレクトする
    router.replace('/console/matters')
  }

  return (
    <>
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
          <h3>獣害情報詳細</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          {matter && (
            <MatterDetail
              matter={matter}
              onRemove={onRemove}
              onUpdate={mutate}
            ></MatterDetail>
          )}
        </Col>
      </Row>
    </>
  )
}

ConsoleMatterDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleMatterDetail
