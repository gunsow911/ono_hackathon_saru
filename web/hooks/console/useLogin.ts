import useAxios from 'axios-hooks'

export type LoginInput = {
  username: string
  password: string
}

const useLogin = () => {
  const [{ data, loading, error }, exec] = useAxios<void>({
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
