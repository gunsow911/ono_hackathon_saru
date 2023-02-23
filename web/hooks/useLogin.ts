import useAxios from 'axios-hooks'

export type LoginForm = {
  username: string
  password: string
}

const useLogin = () => {
  const [{ data, loading, error }, exec] = useAxios<void>({
    url: `/api/login`,
    method: 'POST',
  })

  const execute = (form: LoginForm) => {
    exec({
      data: { ...form },
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
