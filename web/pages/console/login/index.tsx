import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/NoneLayout'
import LoginForm from 'components/logins/LoginForm'
import { Card, Container, Row } from 'react-bootstrap'
import useLogin, { LoginInput } from 'hooks/adminUsers/useLogin'
import useInitCsrfToken from 'hooks/csrf/useInitCsrfToken'

const ConsoleLogin: NextPageWithLayout = () => {
  const { execute: initToken, loading: csrfTokenLoading } = useInitCsrfToken()
  const { execute: login, loading: loginLoading } = useLogin()

  const onSubmit = async (input: LoginInput) => {
    await initToken()
    await login(input)
  }

  return (
    <Container className='pt-3'>
      <Row>
        <div className='h3 pb-3'>小野獣害マップ管理者コンソールログイン</div>
      </Row>
      <Row>
        <Card className='p-3'>
          <LoginForm
            loading={loginLoading || csrfTokenLoading}
            onSubmit={onSubmit}
          ></LoginForm>
        </Card>
      </Row>
    </Container>
  )
}

ConsoleLogin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleLogin
