import useAxios from 'axios-hooks'

const useLogout = () => {
  const [{ data, loading, error }, exec] = useAxios<void>({
    url: `/api/console/logout`,
    method: 'DELETE',
  })

  const execute = () => {
    return exec()
  }

  return {
    data,
    execute,
    loading,
    error,
  }
}

export default useLogout
