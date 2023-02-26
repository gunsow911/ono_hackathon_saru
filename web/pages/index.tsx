import React from 'react'
import MainMap from 'components/maps/MainMap'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/MenuLayout'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div style={{ height: '80vh' }}>
        <MainMap />
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Home
