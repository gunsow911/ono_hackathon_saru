import { Pagination } from 'models/Pagination'
import { Matter } from 'models/Matter'
import useSWR from 'swr'
import yup from 'libs/yup'

export type Condition = {
  query: string
  from: string
  to: string
}

export const searchSchema = yup.object<Condition>().shape({
  query: yup.string().max(255).label('検索文字'),
})

/**
 * ページングされた獣害情報を取得する
 */
const useGetMatterPage = (page: number = 1, condition?: Condition) => {
  const { data, isLoading, mutate } = useSWR<Pagination<Matter>>(
    '/api/console/matters?' +
      new URLSearchParams({
        page: page.toString(),
        q: condition?.query ?? '',
        from: condition?.from ?? '',
        to: condition?.to ?? '',
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

export default useGetMatterPage
