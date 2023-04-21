import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import { Col, Row } from 'react-bootstrap'
import UserTable from 'components/users/UserTable'

const ConsoleUserList: NextPageWithLayout = () => {
  return (
    <>
      <Row>
        <Col>
          <h3>ユーザー情報一覧</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserTable />
        </Col>
      </Row>
    </>
  )
}

ConsoleUserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleUserList
