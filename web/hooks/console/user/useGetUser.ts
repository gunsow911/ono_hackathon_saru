import { User } from 'models/User'
import useSWR from 'swr'

/**
 * ユーザー情報を取得する
 * @param id ユーザー情報ID
 */
const useGetUser = (id?: string) => {
  const { data, isLoading, mutate } = useSWR<User>(
    id ? `/api/console/user/${id}` : undefined,
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

export default useGetUser