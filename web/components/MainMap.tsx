import React from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import HeatmapLayer from 'react-leaflet-heatmap-layer-v3/lib/HeatmapLayer'
import useHeatmapData, {Information} from '../hooks/useHeatmapData'

const MainMap = () => {

  const {data} = useHeatmapData()
  return (
  <>
    <MapContainer center={[34.1046934,131.3046877]} zoom={13} style={{width: '100%', height: '80vh'}}>
      {data &&
        <HeatmapLayer
          points={data}
          longitudeExtractor={m => (m as Information).latLng.lng}
          latitudeExtractor={m => (m as Information).latLng.lat}
          intensityExtractor={_ => 1} 
          radius={30}
          />
      }
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  </>
  )
}

export default MainMap
