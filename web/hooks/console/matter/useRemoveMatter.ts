import useAxios from 'axios-hooks'

/**
 * 獣害情報削除フック
 */
const useRemoveMatter = () => {
  const [{ loading, error }, exec] = useAxios<void>({
    method: 'DELETE',
  })

  /**
   * 獣害情報を削除する
   * @param matterId 獣害情報ID
   */
  const execute = (matterId: string) => {
    return exec({
      url: `/api/console/matters/${matterId}`,
    })
  }

  return {
    execute,
    loading,
    error,
  }
}

export default useRemoveMatter
