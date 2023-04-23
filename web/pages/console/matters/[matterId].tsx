import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import { Col, Row } from 'react-bootstrap'

import MatterDetail from 'components/matters/MatterDetail'
import useGetMatter from 'hooks/console/matter/useGetMatter'
import { useRouter } from 'next/router'

const ConsoleMatterDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const { matterId } = router.query
  const { data: matter } = useGetMatter(matterId as string | undefined)

  const onRemove = () => {
    // 一覧ページにリダイレクトする
    router.replace('/console/matters')
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
          {matter && (
            <MatterDetail matter={matter} onRemove={onRemove}></MatterDetail>
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
