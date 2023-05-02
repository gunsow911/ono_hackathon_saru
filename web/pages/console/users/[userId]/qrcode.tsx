import React from 'react'
import Layout from 'components/layouts/ConsoleNoneLayout'
import { NextPageWithLayout } from '_app'
import UserReportQrCode from 'components/consoles/users/UserReportQrCode'
import { useRouter } from 'next/router'
import useGetUser from 'hooks/console/user/useGetUser'

const Qrcode: NextPageWithLayout = () => {
  const router = useRouter()
  const { userId } = router.query
  const { data: user } = useGetUser(userId as string | undefined)

  return (
    <div className='w-100 vh-100' style={{ backgroundColor: '#ffffff' }}>
      <div className='text-center'>
        {user && (
          <>
            <UserReportQrCode user={user}></UserReportQrCode>
            <div className='h3'>{user.name}</div>
          </>
        )}
      </div>
    </div>
  )
}

Qrcode.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Qrcode
