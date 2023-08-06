import { Dayjs } from 'dayjs'
import { Matter } from 'models/Matter'
import useSWR from 'swr'

/**
 * 獣害情報リストを取得する
 */
const useListMatter = (between: { start: Dayjs; end: Dayjs }) => {
  const { data } = useSWR<Matter[]>(
    `/api/matters?start=${between.start.format(
      'YYYY-MM-DD',
    )}&end=${between.end.format('YYYY-MM-DD')}`,
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
