import React, { useState } from 'react'
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
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'

type Props = {
  name: string
  description: string
}

const ConsoleUserEdit: NextPageWithLayout = (props: Props) => {

  const currentName = props.name;
  const currentDescription = props.description;

  const [ newName, setnewName ] = useState(currentName)
  const [ newDescription, setnewDescription ] = useState(currentDescription)

  const router = useRouter()
  const form = useForm<AddUserForm>({
    mode: 'onSubmit',
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: currentName,
      description: currentDescription,
    },
  })
  const { handleSubmit, getValues } = form
  const { execute, loading } = useAddUser()

  const onSubmit = () => {
    execute(getValues()).then(() => {
      toast.success('ユーザー情報を編集しました！')
      // 一覧ページにリダイレクトする
      router.push('/console/users')
    })
  }

  return (
    <>
      <Row>
        <Col>
          <h3>ユーザー情報編集</h3>
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
                  更新
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

ConsoleUserEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleUserEdit
