import { Matter } from 'models/Matter'
import useSWR from 'swr'

/**
 * 獣害情報リストを取得する
 */
const useListMatter = () => {
  const { data } = useSWR<Matter[]>('/api/matters', null, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  })
  return {
    data,
  }
}

export default useListMatter
