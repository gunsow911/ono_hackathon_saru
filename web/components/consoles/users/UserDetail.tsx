import { yupResolver } from '@hookform/resolvers/yup'
import useRemoveUser from 'hooks/console/user/useRemoveUser'
import useUpdateUser, {
  userSchema,
  UpdateUserForm,
} from 'hooks/console/user/useUpdateUser'
import { User } from 'models/User'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import UserForm from './UserForm'
import AlertDialog from 'components/molecules/AlertDialog'

type Props = {
  user: User
  onUpdate?: () => void
  onRemove?: () => void
}

const UserDetail = (props: Props) => {
  const form = useForm<UpdateUserForm>({
    mode: 'onSubmit',
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: props.user.name,
      description: props.user.description,
    },
  })
  const { getValues, handleSubmit } = form
  const { execute: executeUpdate, loading: loadingUpdate } = useUpdateUser()
  const { execute: executeRemove, loading: loadingRemove } = useRemoveUser()

  const onUpdate = () => {
    executeUpdate(props.user.id, getValues()).then(() => {
      toast.success('更新しました。')
      props.onUpdate && props.onUpdate()
    })
  }

  const loading = loadingUpdate || loadingRemove

  // 削除関連
  const [visible, setVisible] = useState(false)
  const onRemove = () => {
    executeRemove(props.user.id).then((_) => {
      toast.success('ユーザー情報を削除しました。')
      props.onRemove && props.onRemove()
    })
  }

  return (
    <>
      <Card className='py-3 px-4'>
        <Form onSubmit={handleSubmit(onUpdate)}>
          <FormProvider {...form}>
            <UserForm />
          </FormProvider>
          <Form.Label>獣害報告QRコード</Form.Label>
          <div>
            <Link
              href={`/console/users/${props.user.id}/qrcode`}
              target={'_blank'}
            >
              <Button variant='success'>QRコード発行(別タブで開きます)</Button>
            </Link>
          </div>
          <div className='float-end mt-2'>
            <Link href='/console/users'>
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
              このユーザーを削除します。操作はもとに戻せません。
            </AlertDialog>
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

export default UserDetail
