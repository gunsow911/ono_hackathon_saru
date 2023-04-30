import useAxios from 'axios-hooks'

/**
 * ユーザー情報削除フック
 */
const useRemoveUser = () => {
  const [{ loading, error }, exec] = useAxios<void>({
    method: 'DELETE',
  })

  /**
   * ユーザー情報を削除する
   * @param userId ユーザー情報ID
   */
  const execute = (userId: string) => {
    return exec({
      url: `/api/console/users/${userId}`,
    })
  }

  return {
    execute,
    loading,
    error,
  }
}

export default useRemoveUser
