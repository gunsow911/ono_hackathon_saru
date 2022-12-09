import React from 'react'
import {useMapEvent} from 'react-leaflet'

type Props = {
  onChangeLocation?: (lat: number, lng: number) => void
}

const UploadMapEvent = (props: Props) => {
  useMapEvent('click', (e) => {
    props.onChangeLocation && props.onChangeLocation(e.latlng.lat, e.latlng.lng)
  })
  return <></>
}

export default UploadMapEvent


