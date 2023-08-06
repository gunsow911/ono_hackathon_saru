import useAxios from 'axios-hooks'

/**
 * 獣害情報複数削除フック
 */
const useRemoveMultipleMatter = () => {
  const [{ loading, error }, exec] = useAxios<void>({
    method: 'POST',
    url: `/api/console/matters/remove`,
  })

  /**
   * 獣害情報を複数削除する
   * @param matterIds 獣害情報IDリスト
   */
  const execute = (matterIds: string[]) => {
    return exec({
      data: {
        ids: matterIds,
      },
    })
  }

  return {
    execute,
    loading,
    error,
  }
}

export default useRemoveMultipleMatter
