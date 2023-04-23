import { yupResolver } from '@hookform/resolvers/yup'
import useRemoveMatter from 'hooks/console/matter/useRemoveMatter'
import useUpdateMatter, {
  matterSchema,
  UpdateMatterForm,
} from 'hooks/console/matter/useUpdateMatter'
import { Matter } from 'models/Matter'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import MatterForm from './MatterForm'

type Props = {
  matter: Matter
  onUpdate?: () => void
  onRemove?: () => void
}

const MatterDetail = (props: Props) => {
  const form = useForm<UpdateMatterForm>({
    mode: 'onSubmit',
    resolver: yupResolver(matterSchema),
    defaultValues: { ...props.matter },
  })
  const { getValues, handleSubmit } = form
  const { execute: executeUpdate, loading: loadingUpdate } = useUpdateMatter()
  const { execute: executeRemove, loading: loadingRemove } = useRemoveMatter()

  const onUpdate = () => {
    executeUpdate(props.matter.id, getValues()).then(() => {
      toast.success('更新しました。')
      props.onUpdate && props.onUpdate()
    })
  }

  const onRemove = () => {
    executeRemove(props.matter.id).then((_) => {
      toast.success('獣害情報を削除しました。')
      props.onRemove && props.onRemove()
    })
  }

  const loading = loadingUpdate || loadingRemove

  return (
    <>
      <Card className='py-3 px-4'>
        <div>
          <Form.Label>ユーザー名</Form.Label>
          <div>{props.matter.user?.name}</div>
        </div>
        <Form onSubmit={handleSubmit(onUpdate)}>
          <FormProvider {...form}>
            <MatterForm></MatterForm>
          </FormProvider>
          <div className='float-end mt-2'>
            <Link href='/console/matters'>
              <Button variant='secondary' className='ms-1'>
                一覧に戻る
              </Button>
            </Link>
            <Button
              variant='danger'
              className='ms-1'
              onClick={onRemove}
              disabled={loading}
            >
              削除
            </Button>
            <Button
              variant='primary'
              className='ms-1'
              onClick={handleSubmit(onUpdate)}
              disabled={loading}
            >
              更新
            </Button>
          </div>
        </Form>
      </Card>
    </>
  )
}

export default MatterDetail
