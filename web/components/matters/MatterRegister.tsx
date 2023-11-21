import useAddMatter, { AddMatterForm } from 'hooks/matter/useAddMatter'
import { LatLng } from 'models/LatLng'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import MatterForm from './MatterForm'
import SelectForm from 'components/atoms/SelectForm'

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

  // 群れの規模選択肢
  const single = { value: 'single', label: '単独' }
  const group = { value: 'group', label: '群れ' }

  // 出現時間帯選択肢
  const earlymorning = { value: 'earlymorning', label: '早朝' }
  const morning = { value: 'morning', label: '朝' }
  const noon = { value: 'noon', label: '昼' }
  const evening = { value: 'evening', label: '夕方' }
  const night = { value: 'night', label: '夜' }

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
          <div className='pt-4'>
            <SelectForm name={'numberSelect'} options={[single, group]} />
          </div>
          <div className='pt-4'>
            <SelectForm
              name={'timeSelect'}
              options={[earlymorning, morning, noon, evening, night]}
            />
          </div>
        </FormProvider>
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
