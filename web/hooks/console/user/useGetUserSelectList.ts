import { UserSelect } from 'models/UserSelect'
import useSWR from 'swr'

/**
 * ユーザ選択肢リストを取得する
 */
const useGetUserSelectList = () => {
  const { data, isLoading, mutate } = useSWR<UserSelect[]>(
    '/api/console/users?' +
      new URLSearchParams({
        select: 'list',
      }).toString(),
    null,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  )
  return {
    data,
    mutate,
    isLoading,
  }
}

export default useGetUserSelectList
