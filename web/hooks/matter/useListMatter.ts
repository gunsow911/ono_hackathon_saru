import { Dayjs } from 'dayjs'
import { Matter } from 'models/Matter'
import useSWR from 'swr'

/**
 * 獣害情報リストを取得する
 */
const useListMatter = (between: { from: Dayjs; to: Dayjs }) => {
  const { data } = useSWR<Matter[]>(
    `/api/matters?from=${between.from.format(
      'YYYY-MM-DD',
    )}&to=${between.to.format('YYYY-MM-DD')}`,
    null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  )
  return {
    data,
  }
}

export default useListMatter
