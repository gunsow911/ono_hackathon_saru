import { Pagination } from 'models/Pagination'
import { Matter } from 'models/Matter'
import useSWR from 'swr'

/**
 * ページングされた獣害情報を取得する
 */
const useGetMatterPage = (page: number = 1) => {
  const { data, isLoading } = useSWR<Pagination<Matter>>(
    '/api/console/matters?' +
      new URLSearchParams({ page: page.toString() }).toString(),
    null,
    {
      keepPreviousData: true,
    },
  )
  return {
    data,
    isLoading,
  }
}

export default useGetMatterPage
