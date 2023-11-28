import useAddMatter, { AddMatterForm } from 'hooks/matter/useAddMatter'
import { LatLng } from 'models/LatLng'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import MatterForm from './MatterForm'
import dayjs from 'dayjs'

type Props = {
  initLatLng: LatLng
  userId: string
  onCreate?: () => void
}

const MatterRegister = (props: Props) => {
  const now = dayjs()
  const form = useForm<AddMatterForm>({
    mode: 'onSubmit',
    defaultValues: {
      latLng: props.initLatLng,
      scaleType: 'SINGLE',
      dateString: now.format('YYYY-MM-DD'),
      timeString: now.set('minute', 0).set('second', 0).format('HH:mm:ss'),
      isDamaged: false,
    },
  })
  const { getValues, handleSubmit, formState } = form
  const { execute, loading } = useAddMatter()
  const [isToastEmpty, setIsToastEmpty] = useState<boolean>(true)

  toast.onChange((item) => {
    const isActive = toast.isActive(item.id)
    setIsToastEmpty(!isActive)
  })

  const onCreate = () => {
    if (isToastEmpty) {
      execute(props.userId, getValues()).then(
        () => {
          toast.success('報告が完了しました！')
          props.onCreate && props.onCreate()
        },
        () => {
          toast.error(
            <>
              <div>報告に失敗しました。</div>
              <div>
                インターネットの接続や位置情報の設定がオンであることを確かめてください。
              </div>
            </>,
          )
        },
      )
    }
  }

  return (
    <>
      <div className='text-center mb-2'>獣害を受けた場所を選択してください</div>
      <Form>
        <FormProvider {...form}>
          <MatterForm />
        </FormProvider>
        <div className='d-flex justify-content-center pt-2'>
          <Button
            disabled={loading || !isToastEmpty || !formState.isValid}
            onClick={handleSubmit(onCreate)}
          >
            {loading ? <>報告中…</> : <>獣害報告！</>}
          </Button>
        </div>
      </Form>
    </>
  )
}

export default MatterRegister
