import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import useAddUser, {
  AddUserForm,
  userSchema,
} from 'hooks/console/user/useGetUser'
import UserForm from 'components/users/UserForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'

const ConsoleUserNew: NextPageWithLayout = () => {
  const router = useRouter()
  const form = useForm<AddUserForm>({
    mode: 'onSubmit',
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })
  const { handleSubmit, getValues } = form
  const { execute, loading } = useAddUser()

  const onSubmit = () => {
    execute(getValues()).then(() => {
      // 作成に成功
      toast.success('ユーザーを作成しました！')
      // 一覧ページにリダイレクトする
      router.push('/console/users')
    })
  }

  return (
    <>
      <Row>
        <Col>
          <h3>ユーザー情報新規作成</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className='py-3 px-4'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormProvider {...form}>
                <UserForm />
              </FormProvider>
              <div className='float-end mt-2'>
                <Link href='/console/users'>
                  <Button variant='secondary' className='ms-1'>
                    一覧に戻る
                  </Button>
                </Link>
                <Button
                  variant='primary'
                  className='ms-1'
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  新規作成
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

ConsoleUserNew.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleUserNew
