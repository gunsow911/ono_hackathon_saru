import InputForm from 'components/atoms/InputForm'
import { LoginInput } from 'hooks/console/useLogin'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'

type Props = {
  onSubmit?: (input: LoginInput) => void
  loading?: boolean
}

const LoginForm = (props: Props) => {
  const form = useForm<LoginInput>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  /**
   * ログインボタンが押されたときのイベント
   */
  const onSubmit = () => {
    props.onSubmit && props.onSubmit(form.getValues())
  }

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Group className='mb-3'>
          <Form.Label>ユーザー名</Form.Label>
          <InputForm
            name='username'
            placeholder='ユーザー名を入力してください'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>パスワード</Form.Label>
          <InputForm
            name='password'
            type='password'
            placeholder='パスワードを入力してください'
          />
        </Form.Group>
        <Button variant='primary' type='submit' disabled={props.loading}>
          ログイン
        </Button>
      </Form>
    </FormProvider>
  )
}

export default LoginForm
