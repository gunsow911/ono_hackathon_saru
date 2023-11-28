import { yupResolver } from '@hookform/resolvers/yup'
import useRemoveMatter from 'hooks/console/matter/useRemoveMatter'
import useUpdateMatter, {
  matterSchema,
  UpdateMatterForm,
} from 'hooks/console/matter/useUpdateMatter'
import { Matter } from 'models/Matter'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
// import MatterForm from './MatterForm'
import AlertDialog from 'components/molecules/AlertDialog'
import MatterForm from 'components/matters/MatterForm'
import dayjs from 'dayjs'

type Props = {
  matter: Matter
  onUpdate?: () => void
  onRemove?: () => void
}

const MatterDetail = (props: Props) => {
  const form = useForm<UpdateMatterForm>({
    mode: 'onSubmit',
    resolver: yupResolver(matterSchema),
    defaultValues: {
      latLng: props.matter.latLng,
      scaleType: props.matter.scaleType,
      dateString: dayjs(props.matter.appliedAt).format('YYYY-MM-DD'),
      timeString: dayjs(props.matter.appliedAt)
        .set('minute', 0)
        .set('second', 0)
        .format('HH:mm:ss'),
      isDamaged: props.matter.damageType === 'FARM' ? true : false,
    },
  })
  const { getValues, handleSubmit } = form
  const { execute: executeUpdate, loading: loadingUpdate } = useUpdateMatter()
  const { execute: executeRemove, loading: loadingRemove } = useRemoveMatter()

  const onUpdate = () => {
    executeUpdate(props.matter.id, getValues()).then(() => {
      toast.success('変更しました。')
      props.onUpdate && props.onUpdate()
    })
  }
  const [visible, setVisible] = useState(false)
  const onRemove = () => {
    executeRemove(props.matter.id).then(() => {
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
          <Link href={`/console/users/${props.matter.user?.id}`}>
            <p>{props.matter.user?.name}</p>
          </Link>
        </div>
        <Form onSubmit={handleSubmit(onUpdate)}>
          <FormProvider {...form}>
            <MatterForm />
          </FormProvider>
          <div className='float-end mt-2'>
            <Link href='/console/matters'>
              <Button variant='secondary' className='ms-1'>
                一覧に戻る
              </Button>
            </Link>
            <span className='ms-1'>
              <Button variant='danger' onClick={() => setVisible(!visible)}>
                削除
              </Button>
            </span>
            <AlertDialog
              show={visible}
              title='確認'
              confirmText='削除'
              confirmColor='danger'
              onConfirm={onRemove}
              onCancel={() => setVisible(false)}
            >
              この獣害情報を削除します。操作はもとに戻せません。
            </AlertDialog>
            <Button
              variant='primary'
              className='ms-1'
              onClick={handleSubmit(onUpdate)}
              disabled={loading}
            >
              変更
            </Button>
          </div>
        </Form>
      </Card>
    </>
  )
}

export default MatterDetail
