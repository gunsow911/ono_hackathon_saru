import { Pagination } from 'models/Pagination'
import { AppearType, Matter } from 'models/Matter'
import useSWR from 'swr'
import yup from 'libs/yup'

export type Condition = {
  query: string
  from: string
  to: string
  appearType: AppearType | null
  isDamaged: string | null
  min?: number | string
  max?: number | string
}

export const searchSchema = yup.object<Condition>().shape({
  query: yup.string().max(255).label('検索文字'),
})

/**
 * ページングされた獣害情報を取得する
 */
const useGetMatterPage = (page: number = 1, condition?: Condition) => {
  let params: Record<string, string> = {
    page: page.toString(),
  }
  if (condition?.query) {
    params = { ...params, q: condition.query }
  }
  if (condition?.from) {
    params = { ...params, from: condition.from }
  }
  if (condition?.to) {
    params = { ...params, from: condition.to }
  }
  if (condition && condition.appearType !== null) {
    params = { ...params, appearType: condition.appearType }
  }
  if (condition && condition.isDamaged !== null) {
    params = { ...params, isDamaged: condition.isDamaged }
  }
  if (condition && condition.max !== undefined && condition.max !== '') {
    params = { ...params, max: condition.max.toString() }
  }
  if (condition && condition.min !== undefined && condition.min !== '') {
    params = { ...params, min: condition.min.toString() }
  }

  const { data, isLoading, mutate } = useSWR<Pagination<Matter>>(
    '/api/console/matters?' + new URLSearchParams(params).toString(),
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
