import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAddMatter, {
  AddMatterForm,
  matterSchema,
} from 'hooks/console/matter/useAddMatter'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import { Matter } from 'models/Matter'
import SelectForm from 'components/atoms/SelectForm'
import useGetUserSelectList from 'hooks/console/user/useGetUserSelectList'
import CreateNewMatterForm from 'components/atoms/CreateNewMatterForm'

type Props = {
  initLatLng: LatLng
  onCreate?: (matter: Matter) => void
  onCreateContinuous?: (matter: Matter) => void
}

const MatterNew = (props: Props) => {
  const now = dayjs()
  const form = useForm<AddMatterForm>({
    mode: 'onSubmit',
    resolver: yupResolver(matterSchema),
    defaultValues: {
      userId: undefined,
      latLng: props.initLatLng,
      appliedAt: now.format('YYYY-MM-DD'),
    },
  })
  const { getValues, handleSubmit } = form
  const { execute, loading } = useAddMatter()

  const onCreate = () => {
    execute(getValues()).then((matter) => {
      toast.success('作成しました。')
      props.onCreate && props.onCreate(matter.data)
    })
  }

  const onCreateContinuous = () => {
    execute(getValues()).then((matter) => {
      toast.success('作成しました。')
      form.reset({
        appliedAt: matter.data.appliedAt,
        latLng: matter.data.latLng,
        userId: matter.data.userId,
      })
      props.onCreateContinuous && props.onCreateContinuous(matter.data)
    })
  }

  const { data: userSelectList } = useGetUserSelectList()
  const userSelectOptions: { value: string; label: string }[] =
    userSelectList?.map((select) => {
      return { value: select.id, label: select.name }
    }) ?? []

  return (
    <>
      <Card className='py-3 px-4'>
        <Form onSubmit={handleSubmit(onCreate)}>
          <FormProvider {...form}>
            {/* 管理者用の獣害情報新規作成にのみユーザー名の入力が必要 */}
            <SelectForm
              name='userId'
              label='ユーザー名'
              options={userSelectOptions}
              isClearable
            />
              <CreateNewMatterForm />
          </FormProvider>
          <div className='float-end mt-2'>
            <Link href='/console/matters'>
              <Button variant='secondary' className='ms-1'>
                一覧に戻る
              </Button>
            </Link>
            <Button
              variant='primary'
              className='ms-1'
              onClick={handleSubmit(onCreate)}
              disabled={loading}
            >
              作成
            </Button>
            <Button
              variant='primary'
              className='ms-1'
              onClick={handleSubmit(onCreateContinuous)}
              disabled={loading}
            >
              連続作成
            </Button>
          </div>
        </Form>
      </Card>
    </>
  )
}

export default MatterNew
