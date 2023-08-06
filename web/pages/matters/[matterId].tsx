import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/MenuLayout'
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap'

import { useRouter } from 'next/router'
import MarkerMap from 'components/maps/MarkerMap'
import useGetMatter from 'hooks/matter/useGetMatter'
import dayjs, { Dayjs } from 'dayjs'

const MatterDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const { matterId } = router.query
  const { data } = useGetMatter(matterId as string | undefined)

  const getDateFormat = (date: Dayjs) => {
    return date.format('YYYY年M月D日')
  }

  return (
    <>
      <Row>
        <Col>
          <h3>獣害情報詳細</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className='py-3 px-4'>
            {data ? (
              <div>
                <Form.Label>ユーザー名</Form.Label>
                <p>{data.user?.name}</p>
                <Form.Label>日付</Form.Label>
                <p>{getDateFormat(dayjs(data.appliedAt))}</p>
                <MarkerMap latLng={data?.latLng} />
              </div>
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
    </>
  )
}

MatterDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default MatterDetail
