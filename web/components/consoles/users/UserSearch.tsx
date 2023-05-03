import { yupResolver } from '@hookform/resolvers/yup'
import InputForm from 'components/atoms/CustomTable'
import { Condition, searchSchema } from 'hooks/console/matter/useGetMatterPage'
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
            {/* <Col sm={3}>
              <InputForm type='date' name='from' label='日付(自)' />
            </Col> */}
            {/* <Col sm={3}>
              <InputForm type='date' name='to' label='日付(至)' />
            </Col> */}
          </Row>
        </FormProvider>
        <div className='float-end mt-2'>
          <Button
            variant='primary'
            className='ms-1'
            onClick={handleSubmit(onChange)}
          >
            <span className='d-flex align-items-center'>
              <BsSearch />
              検索
            </span>
          </Button>
        </div>
      </Form>
    </>
  )
}

export default UserSearch
