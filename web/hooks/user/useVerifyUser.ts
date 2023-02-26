import useAxios from 'axios-hooks'
import { useState } from 'react'

/**
 * ユーザの存在確認を行うフック
 */
const useVerifyUser = () => {
  const [{ loading }, exec] = useAxios<void>({
    method: 'GET',
  })

  const [isVerify, setVerify] = useState<boolean>()

  const verify = (userId: string) => {
    exec({
      url: `/api/users/${userId}/verify`,
    })
      .then(() => {
        setVerify(true)
      })
      .catch(() => {
        setVerify(false)
      })
  }

  return {
    verify,
    isVerify,
    loading,
  }
}

export default useVerifyUser
