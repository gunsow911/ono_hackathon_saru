import useAddMatter, { AddMatterForm } from 'hooks/matter/useAddMatter'
import { LatLng } from 'models/LatLng'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import MatterForm from './MatterForm'

type Props = {
  initLatLng: LatLng
  userId: string
  onCreate?: () => void
}

const MatterRegister = (props: Props) => {
  const form = useForm<AddMatterForm>({
    mode: 'onSubmit',
    defaultValues: {
      latLng: props.initLatLng,
      numberSelect: '',
      timeSelect: '',
    },
  })
  const { getValues, handleSubmit, formState, control } = form
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
          const id = toast.success('報告が完了しました！')
          props.onCreate && props.onCreate()
        },
        () => {
          const id = toast.error(
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
      <Form onSubmit={handleSubmit(onCreate)}>
        <FormProvider {...form}>
          <MatterForm />
        </FormProvider>
        <div className='d-flex justify-content-center pt-2'>
          <Controller
            name='numberSelect'
            control={control}
            render={({ field }) => (
              <Form.Select {...field}>
                <option value=''>頭数を選択</option>
                <option value='single'>単独</option>
                <option value='group'>群れ</option>
              </Form.Select>
            )}
          />
        </div>
        <div className='d-flex justify-content-center pt-2'>
          <Controller
            name='timeSelect'
            control={control}
            render={({ field }) => (
              <Form.Select {...field}>
                <option value=''>出現時間を選択</option>
                <option value='earlymorning'>早朝</option>
                <option value='morning'>朝</option>
                <option value='noon'>昼</option>
                <option value='evening'>夕方</option>
                <option value='night'>夜</option>
              </Form.Select>
            )}
          />
        </div>
        <div className='d-flex justify-content-center pt-2'>
          <Button
            disabled={
              loading ||
              !isToastEmpty ||
              !formState.isDirty ||
              !formState.isValid ||
              getValues('numberSelect') === '' ||
              getValues('timeSelect') === ''
            }
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
