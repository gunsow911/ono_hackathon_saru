import useAxios from 'axios-hooks'

export type LoginInput = {
  username: string
  password: string
}

const useInitCsrfToken = () => {
  const [{ loading }, exec] = useAxios({
    url: `/sanctum/csrf-cookie`,
    method: 'GET',
  })

  const execute = () => {
    return exec()
  }

  return {
    execute,
    loading,
  }
}

export default useInitCsrfToken
