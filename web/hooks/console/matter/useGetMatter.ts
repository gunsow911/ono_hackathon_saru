import { Matter } from 'models/Matter'
import useSWR from 'swr'

/**
 * 獣害情報を取得する
 * @param id 獣害情報ID
 */
const useGetMatter = (id?: string) => {
  const { data, isLoading, mutate } = useSWR<Matter>(
    id ? `/api/console/matters/${id}` : undefined,
    null,
    {
      keepPreviousData: true,
    },
  )
  return {
    data,
    mutate,
    isLoading,
  }
}

export default useGetMatter
