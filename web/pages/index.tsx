import React from 'react'
import Descirption from '../components/Description'
import MainMap from '../components/MainMap'

export default function Home() {
  return (
    <>
      <div style={{ height: '80vh' }}>
        <MainMap />
      </div>
      <Descirption />
    </>
  )
}
