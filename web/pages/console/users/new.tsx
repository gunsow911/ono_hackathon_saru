import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import useAddUser, {
  AddUserForm,
  userSchema,
} from 'hooks/console/user/useAddUser'
import UserForm from 'components/users/UserForm'
import { yupResolver } from '@hookform/resolvers/yup'

const ConsoleUserNew: NextPageWithLayout = () => {
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
    console.log(getValues())
    // execute(getValues())
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
              <Button
                className='float-end mt-2'
                variant='primary'
                onClick={onSubmit}
                disabled={loading}
              >
                新規作成
              </Button>
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
