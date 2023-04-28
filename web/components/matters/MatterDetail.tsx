import useAddMatter, { AddMatterForm } from 'hooks/matter/useAddMatter'
import { LatLng } from 'models/LatLng'
import React, { ReactNode } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import MatterForm from './MatterForm'

type Props = {
  initLatLng: LatLng
  userId: string
  onCreate?: () => void
}

const MatterDetail = (props: Props) => {
  const form = useForm<AddMatterForm>({
    mode: 'onSubmit',
    defaultValues: {
      latLng: props.initLatLng,
    },
  })
  const { getValues, handleSubmit } = form
  const { data, execute, loading, error } = useAddMatter()

  const onCreate = () => {
    execute(props.userId, getValues()).then(() => {
      props.onCreate && props.onCreate()
    })
  }

  const showResult = (): ReactNode => {
    if (data && error !== null) {
      return (
        <Alert variant='danger'>
          報告に失敗しました。インターネットの接続や位置情報の設定がオンであることを確かめてください。
        </Alert>
      )
    }
    if (data && !loading) {
      return <Alert variant='success'>報告が完了しました！</Alert>
    }
    return <></>
  }

  return (
    <>
      <div className='text-center'>獣害を受けた場所を選択してください</div>
      <Form onSubmit={handleSubmit(onCreate)}>
        <FormProvider {...form}>
          <MatterForm />
        </FormProvider>
        <div className='d-flex justify-content-center pt-2'>
          <Button disabled={loading} onClick={handleSubmit(onCreate)}>
            {loading ? <>報告中…</> : <>獣害報告！</>}
          </Button>
        </div>
      </Form>
      <div className='pt-2'>{showResult()}</div>
    </>
  )
}

export default MatterDetail
