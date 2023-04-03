import useAxios from 'axios-hooks'
import { AdminUser } from 'models/AdminUser'

/**
 * 管理者データを取得する
 */
const useGetMe = () => {
  const [, exec] = useAxios<AdminUser>({
    url: `/api/console/admin-users/me`,
    method: 'GET',
  })
  return {
    execute: exec,
  }
}

export default useGetMe
