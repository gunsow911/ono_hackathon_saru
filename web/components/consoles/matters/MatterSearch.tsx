import { yupResolver } from '@hookform/resolvers/yup'
import InputForm from 'components/atoms/InputForm'
import NumberInputForm from 'components/atoms/NumberInputForm'
import SelectForm from 'components/atoms/SelectForm'
import { Condition, searchSchema } from 'hooks/console/matter/useGetMatterPage'
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { BsSearch } from 'react-icons/bs'

type Props = {
  condition: Condition
  onChange?: (condition: Condition) => void
}

const MatterSearch = (props: Props) => {
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
          <Row className='gy-2'>
            <Col sm={6}>
              <InputForm
                name='query'
                placeholder='ユーザー名やユーザーIDで検索'
                label='文字検索'
              />
            </Col>
            <Col sm={3}>
              <InputForm type='date' name='from' label='日付(自)' />
            </Col>
            <Col sm={3}>
              <InputForm type='date' name='to' label='日付(至)' />
            </Col>
            <Col sm={3}>
              <SelectForm
                name='appearType'
                options={[
                  { label: '見た', value: 'SEEING' },
                  { label: '声を聞いた', value: 'HEARING' },
                ]}
                isClearable={true}
                label='出没時の状況'
                placeholder='検索条件なし'
              />
            </Col>
            <Col sm={3}>
              <SelectForm
                name='isDamaged'
                options={[
                  { label: '被害あり', value: 'true' },
                  { label: '被害なし', value: 'false' },
                ]}
                isClearable={true}
                label='農業被害'
                placeholder='検索条件なし'
              />
            </Col>
            <Col sm={3}>
              <NumberInputForm
                name='min'
                label='最小(頭数)'
                placeholder='検索条件なし'
              />
            </Col>
            <Col sm={3}>
              <NumberInputForm
                name='max'
                label='最大(頭数)'
                placeholder='検索条件なし'
              />
            </Col>
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

export default MatterSearch
