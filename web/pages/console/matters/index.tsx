import React, { useState } from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'
import MatterTable from 'components/consoles/matters/MatterTable'
import { Button, Card, Col, Row } from 'react-bootstrap'
import MatterSearch from 'components/consoles/matters/MatterSearch'
import { Condition } from 'hooks/console/matter/useGetMatterPage'
import Link from 'next/link'

const ConsoleMatterList: NextPageWithLayout = () => {
  const [condition, setCondition] = useState<Condition>({
    query: '',
    from: '',
    to: '',
  })
  const onChange = (value: Condition) => {
    setCondition(value)
  }

  return (
    <>
      <Row>
        <Col>
          <h3>獣害情報一覧</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className='py-3 px-4'>
            <div className='pb-4'>
              <MatterSearch condition={condition} onChange={onChange} />
            </div>
            <div className='mb-2'>
              <Link href='/console/matters/new'>
                <Button className='float-end' variant='primary'>
                  獣害情報新規作成
                </Button>
              </Link>
            </div>
            <MatterTable condition={condition} />
          </Card>
        </Col>
      </Row>
    </>
  )
}

ConsoleMatterList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleMatterList
