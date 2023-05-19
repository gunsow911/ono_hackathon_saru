import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import MatterForm from './MatterForm'
import useAddMatter, {
  AddMatterForm,
  matterSchema,
} from 'hooks/console/matter/useAddMatter'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import UserSelectForm from '../users/UserSelectForm'

type Props = {
  initLatLng: LatLng
  onCreate?: () => void
}

const MatterNew = (props: Props) => {
  const now = dayjs()
  const form = useForm<AddMatterForm>({
    mode: 'onSubmit',
    resolver: yupResolver(matterSchema),
    defaultValues: {
      appliedAt: now.format('YYYY-MM-DD'),
      latLng: props.initLatLng,
    },
  })
  const { getValues, handleSubmit } = form
  const { execute, loading } = useAddMatter()

  const onCreate = () => {
    execute(getValues()).then(() => {
      toast.success('更新しました。')
      props.onCreate && props.onCreate()
    })
  }
  return (
    <>
      <Card className='py-3 px-4'>
        <Form onSubmit={handleSubmit(onCreate)}>
          <FormProvider {...form}>
            <UserSelectForm />
            <MatterForm />
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
          </div>
        </Form>
      </Card>
    </>
  )
}

export default MatterNew
