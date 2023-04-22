import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import { Button, Card, Col, Row } from 'react-bootstrap'
import UserTable from 'components/users/UserTable'
import Link from 'next/link'

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
          <Card className='py-3 px-4'>
            <div className='mb-2'>
              <Link href='/console/users/new'>
                <Button className='float-end' variant='primary'>
                  ユーザ新規作成
                </Button>
              </Link>
            </div>
            <UserTable />
          </Card>
        </Col>
      </Row>
    </>
  )
}

ConsoleUserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleUserList
