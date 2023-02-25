import { Matter } from 'models/Matter'
import useSWR from 'swr'

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
