import useAxios from 'axios-hooks'
import { AdminUser } from 'models/AdminUser'

export type LoginInput = {
  username: string
  password: string
}

const useLogin = () => {
  const [{ data, loading, error }, exec] = useAxios<AdminUser>({
    url: `/api/console/login`,
    method: 'POST',
  })

  const execute = (input: LoginInput) => {
    return exec({
      data: { ...input },
    })
  }

  return {
    data,
    execute,
    loading,
    error,
  }
}

export default useLogin
