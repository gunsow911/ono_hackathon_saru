import { yupResolver } from '@hookform/resolvers/yup'
// import useRemoveMatter from 'hooks/console/matter/useRemoveMatter'
import { matterSchema } from 'hooks/console/matter/useUpdateMatter'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import UserForm from 'components/consoles/users/UserForm'
import { User } from 'models/User'
import useUpdateUser, { UpdateUserForm } from 'hooks/console/user/useUpdateUser'
import useRemoveUser from 'hooks/console/user/useRemoveUser'

type Props = {
  user: User
  onUpdate?: () => void
  onRemove?: () => void
}

const UserDetail = (props: Props) => {
  const form = useForm<UpdateUserForm>({
    mode: 'onSubmit',
    resolver: yupResolver(matterSchema),
    defaultValues: { ...props.user },
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

  const onRemove = () => {
    executeRemove(props.user.id).then((_) => {
      toast.success('ユーザー情報を削除しました。')
      props.onRemove && props.onRemove()
    })
  }

  const loading = loadingUpdate || loadingRemove

  return (
    <>
      <Card className='py-3 px-4'>
        <div>
          <Form.Label>ユーザー名</Form.Label>
          {/* <div>{props.matter.user?.name}</div> */}
        </div>
        <Form onSubmit={handleSubmit(onUpdate)}>
          <FormProvider {...form}>
            <UserForm></UserForm>
          </FormProvider>
          <div className='float-end mt-2'>
            <Link href='/console/users'>
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

export default UserDetail
