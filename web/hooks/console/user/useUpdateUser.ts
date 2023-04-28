import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { User } from 'models/User'
import * as yup from 'yup'

export type UpdateUserForm = {
  name: string
  description: string
}

export const matterSchema = yup.object<UpdateUserForm>().shape({
  appliedAt: yup.date().required(),
  lat: yup.number().required(),
  lng: yup.number().required(),
})

/**
 * ユーザー情報更新フック
 */
const useUpdateUser = () => {
  const [{ loading, error }, exec] = useAxios<User>({
    method: 'PUT',
  })

  const execute = (userId: string, form: UpdateUserForm) => {
    return exec({
      url: `/api/console/users/${userId}`,
      data: {
        ...form,
        // appliedAt: dayjs(form.appliedAt).format('YYYY-MM-DD'),
      },
    })
  }

  return {
    execute,
    loading,
    error,
  }
}

export default useUpdateUser
