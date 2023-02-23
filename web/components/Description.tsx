import Link from 'next/link'
import React from 'react'
import { Button } from 'react-bootstrap'

const Descirption = () => {
  return (
    <div>
      <div className='d-flex justify-content-center'>
        <div>被害発見！ 報告はこちらから！</div>
      </div>
      <div className='mt-2 d-flex justify-content-center'>
        <Link href='/upload'>
          <Button>獣害報告画面</Button>
        </Link>
      </div>
    </div>
  )
}

export default Descirption
