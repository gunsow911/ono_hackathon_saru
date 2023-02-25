import React, { useMemo } from 'react'
import DeckGLMap from '../atoms/DeckGLMap'
import { IconLayer } from '@deck.gl/layers/typed'

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 64, height: 64, anchorY: 64 },
}

type Props = {
  latLng: { lat: number; lng: number }
  onChangeLocation?: (lat: number, lng: number) => void
}

const UploadMap = (props: Props) => {
  const onChangeLocation = (lat: number, lng: number) => {
    props.onChangeLocation && props.onChangeLocation(lat, lng)
  }

  const initLatLng = useMemo(() => {
    return props.latLng
  }, [])

  const iconLayer = new IconLayer<[number, number]>({
    id: 'icon-layer',
    data: [[props.latLng.lng, props.latLng.lat]],
    iconAtlas: '/image/marker.png',
    iconMapping: ICON_MAPPING,
    getIcon: (_) => 'marker',
    sizeScale: 1,
    getPosition: (d) => d,
    getSize: (_) => 32,
  })

  return (
    <DeckGLMap
      layers={[iconLayer]}
      style={{ width: '400px', height: '300px', position: 'relative' }}
      initialViewState={{
        longitude: initLatLng.lng,
        latitude: initLatLng.lat,
        zoom: 16,
        pitch: 0,
        bearing: 0,
      }}
      onClick={(info) =>
        info.coordinate &&
        onChangeLocation(info.coordinate[1], info.coordinate[0])
      }
    />
  )
}

export default UploadMap
