import { Pagination } from 'models/Pagination'
import { User } from 'models/User'
import useSWR from 'swr'

/**
 * ページングされたユーザ情報を取得する
 */
const useGetUserPage = (page: number = 1) => {
  const { data, isLoading, mutate } = useSWR<Pagination<User>>(
    '/api/console/users?' +
      new URLSearchParams({ page: page.toString() }).toString(),
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

export default useGetUserPage
