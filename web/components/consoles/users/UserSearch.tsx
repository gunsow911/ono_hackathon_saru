import { yupResolver } from '@hookform/resolvers/yup'
import InputForm from 'components/atoms/InputForm'
import { Condition, searchSchema } from 'hooks/console/user/useGetUserPage'
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { BsSearch } from 'react-icons/bs'

type Props = {
  condition: Condition
  onChange?: (condition: Condition) => void
}

const UserSearch = (props: Props) => {
  const form = useForm<Condition>({
    mode: 'onSubmit',
    resolver: yupResolver(searchSchema),
    defaultValues: { ...props.condition },
  })
  const { getValues, handleSubmit } = form

  const onChange = () => {
    props.onChange && props.onChange(getValues())
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onChange)}>
        <FormProvider {...form}>
          <Row>
            <Col sm={6}>
              <InputForm
                name='query'
                placeholder='ユーザー名やユーザーIDで検索'
                label='文字検索'
              />
            </Col>
            <Col sm={6} className='d-flex align-items-end'>
              <Button
                variant='primary'
                className=''
                onClick={handleSubmit(onChange)}
              >
                <span className='d-flex align-items-center'>
                  <BsSearch />
                  検索
                </span>
              </Button>
            </Col>
          </Row>
        </FormProvider>
      </Form>
    </>
  )
}

export default UserSearch
