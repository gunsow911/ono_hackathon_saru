import useAxios from 'axios-hooks'
import { User } from 'models/User'
import * as yup from 'yup'

export type UpdateUserForm = {
  name: string
  description: string
}

export const userSchema = yup.object<UpdateUserForm>().shape({
  name: yup.string().max(255).required(),
  description: yup.string().max(2000),
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
