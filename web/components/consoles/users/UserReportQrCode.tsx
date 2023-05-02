import { useClient } from 'hooks/util/useClient'
import { User } from 'models/User'
import { useQRCode } from 'next-qrcode'
import React, { useEffect, useState } from 'react'

type Props = {
  user: User
}

const UserReportQrCode = (props: Props) => {
  const { SVG } = useQRCode()
  const isClient = useClient()
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    if (isClient) {
      setUrl(
        `${location.protocol}//${location.hostname}/users/${props.user.id}/report`,
      )
    }
  }, [isClient, props.user])

  return (
    <>
      {url && (
        <SVG
          text={url}
          options={{
            margin: 2,
            width: 320,
          }}
        ></SVG>
      )}
    </>
  )
}

export default UserReportQrCode
