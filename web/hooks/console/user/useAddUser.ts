import useAxios from 'axios-hooks'
import { User } from 'models/User'
import yup from 'libs/yup'

export type AddUserForm = {
  name: string
  description: string
}

export const userSchema = yup.object<AddUserForm>().shape({
  name: yup.string().max(255).required().label('名前'),
  description: yup.string().max(2000).label('概要'),
})

/**
 * ユーザ新規作成フック
 */
const useAddUser = () => {
  const [{ loading, error }, exec] = useAxios<User>({
    url: `/api/console/users`,
    method: 'POST',
  })

  const execute = (form: AddUserForm) => {
    return exec({
      data: {
        name: form.name,
        description: form.description,
      },
    })
  }

  return {
    execute,
    loading,
    error,
  }
}

export default useAddUser
