import DeckGLMap from 'components/atoms/DeckGLMap'
import { IconLayer } from '@deck.gl/layers/typed'
import { LatLng } from 'models/LatLng'

type Props = {
  latLng: LatLng
  width?: string
  height?: string
}

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 64, height: 64, anchorY: 64 },
}

/**
 * マーカーマップを表示できるマップ
 */
const MarkerMap = (props: Props) => {
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
      style={{
        width: props.width ? props.width : '100%',
        height: props.height ? props.height : '300px',
        position: 'relative',
      }}
      initialViewState={{
        longitude: props.latLng.lng,
        latitude: props.latLng.lat,
        zoom: 16,
        pitch: 0,
        bearing: 0,
      }}
    />
  )
}

export default MarkerMap
