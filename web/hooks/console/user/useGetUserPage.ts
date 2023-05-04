import { Pagination } from 'models/Pagination'
import { User } from 'models/User'
import useSWR from 'swr'
import * as yup from 'yup'

export type Condition = {
  query: string
  // from: string
  // to: string
}

export const searchSchema = yup.object<Condition>().shape({
  query: yup.string().max(255),
})

/**
 * ページングされたユーザ情報を取得する
 */
const useGetUserPage = (page: number = 1, condition?: Condition) => {
  const { data, isLoading, mutate } = useSWR<Pagination<User>>(
    '/api/console/users?' +
      new URLSearchParams({
        page: page.toString(),
        q: condition?.query ?? '',
      }).toString(),
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
