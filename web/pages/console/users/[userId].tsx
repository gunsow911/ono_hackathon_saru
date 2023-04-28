import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import { Col, Row } from 'react-bootstrap'

import UserDetail from 'components/users/UserDetail'
import { useRouter } from 'next/router'
import useGetUser from 'hooks/console/user/useGetUser'

const ConsoleUserDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const { userId } = router.query
  const { data: user } = useGetUser(userId as string | undefined)

  const onRemove = () => {
    // 一覧ページにリダイレクトする
    router.replace('/console/users')
  }

  return (
    <>
      <Row>
        <Col>
          <h3>ユーザー情報詳細</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          {user && (
            <UserDetail user={user} onRemove={onRemove}></UserDetail>
          )}
        </Col>
      </Row>
    </>
  )
}

ConsoleUserDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleUserDetail
