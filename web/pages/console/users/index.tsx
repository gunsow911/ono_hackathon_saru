import React, { useState } from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import { Button, Card, Col, Row } from 'react-bootstrap'
import UserTable from 'components/consoles/users/UserTable'
import Link from 'next/link'
import UserSearch from 'components/consoles/users/UserSearch'
import { Condition } from 'hooks/console/user/useGetUserPage'

const ConsoleUserList: NextPageWithLayout = () => {
  const [condition, setCondition] = useState<Condition>({
    query: '',
  })
  const onChange = (value: Condition) => {
    setCondition(value)
  }
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
            <div className='pb-4'>
              <UserSearch condition={condition} onChange={onChange} />
            </div>
            <div className='mb-2'>
              <Link href='/console/users/new'>
                <Button className='float-end' variant='primary'>
                  ユーザー新規作成
                </Button>
              </Link>
            </div>
            <UserTable condition={condition} />
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
