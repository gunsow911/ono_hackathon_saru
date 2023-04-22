import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import MatterTable from 'components/matters/MatterTable'
import { Card, Col, Row } from 'react-bootstrap'

const ConsoleMatterList: NextPageWithLayout = () => {
  return (
    <>
      <Row>
        <Col>
          <h3>獣害情報一覧</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className='py-3 px-4'>
            <MatterTable />
          </Card>
        </Col>
      </Row>
    </>
  )
}

ConsoleMatterList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleMatterList
