import React, { useState } from 'react'
import HeatmapMap from 'components/maps/HeatmapMap'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/MenuLayout'
import useListMatter from 'hooks/matter/useListMatter'
import TimeScale from 'components/maps/controls/TimeScale'
import dayjs, { Dayjs } from 'dayjs'

const Home: NextPageWithLayout = () => {
  const now = dayjs().endOf('day')
  const lastWeek = now.add(-1, 'week').startOf('day')

  const [between, setBetween] = useState<{ from: Dayjs; to: Dayjs }>({
    from: lastWeek,
    to: now,
  })

  const { data } = useListMatter(between)

  return (
    <div className='main'>
      <div className='fullscreen-map' style={{ position: 'relative' }}>
        <HeatmapMap
          data={data}
          initLatLng={{ lat: 34.1046934, lng: 131.3046877 }}
          getPosition={(data) => {
            return [data.latLng.lng, data.latLng.lat]
          }}
        >
          <TimeScale onChange={setBetween} />
        </HeatmapMap>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default Home
