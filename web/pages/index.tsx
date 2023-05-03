import React from 'react'
import HeatmapMap from 'components/maps/HeatmapMap'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/MenuLayout'
import useListMatter from 'hooks/matter/useListMatter'

const Home: NextPageWithLayout = () => {
  const { data } = useListMatter()
  return (
    <div style={{ height: 'calc(100vh - 56px)' }}>
      <HeatmapMap
        data={data}
        initLatLng={{ lat: 34.1046934, lng: 131.3046877 }}
        getPosition={(data) => {
          return [data.latLng.lng, data.latLng.lat]
        }}
      />
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Home
