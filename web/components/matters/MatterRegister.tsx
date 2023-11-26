import useAddMatter, { AddMatterForm } from 'hooks/matter/useAddMatter'
import { LatLng } from 'models/LatLng'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import CreateNewMatterForm from 'components/atoms/CreateNewMatterForm'
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
      numberSelect: '',
      appliedAt: now.format('YYYY-MM-DD'),
      timeSelect: '',
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
          <CreateNewMatterForm/>
        </FormProvider>
        <div className='d-flex justify-content-center pt-2'>
          <Button
            disabled={
              loading ||
              !isToastEmpty ||
              // !formState.isDirty ||
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
