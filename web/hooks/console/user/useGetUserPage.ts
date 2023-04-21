import { Pagination } from 'models/Pagination'
import { User } from 'models/User'
import useSWR from 'swr'

/**
 * ページングされたユーザ情報を取得する
 */
const useGetUserPage = () => {
  const { data } = useSWR<Pagination<User>>('/api/console/users')
  return {
    data,
  }
}

export default useGetUserPage
