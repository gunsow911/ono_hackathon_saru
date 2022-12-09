import React from 'react'
import {MapContainer, Marker, TileLayer, useMapEvent} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import UploadMapEvent from './UploadMapEvent';
import {Box} from '@material-ui/core';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'leaflet/marker-icon-2x.png',
    iconUrl: 'leaflet/marker-icon.png',
    shadowUrl: 'leaflet/marker-shadow.png'
});

type Props = {
  latLng: {lat: number, lng: number}
  onChangeLocation?: (lat: number, lng: number) => void
}

const UploadMap = (props: Props) => {
  const onChangeLocation = (lat: number, lng: number) => {
    props.onChangeLocation && props.onChangeLocation(lat, lng)
  }

  return (
  <>
    <MapContainer center={[props.latLng.lat, props.latLng.lng]} zoom={16} style={{width: 400, height: 300}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={{...props.latLng}} />
      <UploadMapEvent onChangeLocation={onChangeLocation} />
    </MapContainer>
  </>
  )
}

export default UploadMap

