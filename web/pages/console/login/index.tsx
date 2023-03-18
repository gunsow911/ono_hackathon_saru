import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/NoneLayout'
import LoginForm from 'components/logins/LoginForm'
import { Card, Container, Row } from 'react-bootstrap'
import useLogin, { LoginInput } from 'hooks/adminUsers/useLogin'

const ConsoleLogin: NextPageWithLayout = () => {
  const { execute: login, loading } = useLogin()

  const onSubmit = (input: LoginInput) => {
    login(input)
  }

  return (
    <Container className='pt-3'>
      <Row>
        <div className='h3 pb-3'>小野獣害マップ管理者コンソールログイン</div>
      </Row>
      <Row>
        <Card className='p-3'>
          <LoginForm loading={loading} onSubmit={onSubmit}></LoginForm>
        </Card>
      </Row>
    </Container>
  )
}

ConsoleLogin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleLogin
