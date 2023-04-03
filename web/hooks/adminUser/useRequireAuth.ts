import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { AdminUser } from 'models/AdminUser'
import { AxiosError } from 'axios'

/**
 * 要認証Hook
 * このHookを利用すると認証が必要な場合に自動的にリダイレクトするようになる
 */
const useRequireAuth = (url: string) => {
  const { data, mutate, error } = useSWR<AdminUser | null, AxiosError>(
    '/api/console/admin-users/me',
    null,
    {
      keepPreviousData: true,
    },
  )

  useEffect(() => {
    if (error?.response?.status === 401) {
      mutate(null)
    }
  }, [error])

  const router = useRouter()

  useEffect(() => {
    if (data === null) {
      router.replace(url)
    }
  }, [data])
}

export default useRequireAuth
