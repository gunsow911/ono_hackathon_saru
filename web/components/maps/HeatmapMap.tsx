import { HeatmapLayer } from '@deck.gl/aggregation-layers/typed'
import DeckGLMap from 'components/atoms/DeckGLMap'
import { LatLng } from 'models/LatLng'

type Props<T> = {
  data?: T[]
  initLatLng: LatLng
  getPosition: (data: T) => [lng: number, lat: number]
}

/**
 * ヒートマップを表示できるマップ
 */
const HeatmapMap = <T,>(props: Props<T>) => {
  const heatmapLayer = new HeatmapLayer<T>({
    id: 'heatmapLayer',
    data: props.data,
    getPosition: props.getPosition,
    colorRange: [
      [50, 136, 189, 200],
      [153, 213, 148, 200],
      [230, 245, 152, 200],
      [254, 224, 139, 200],
      [252, 141, 89, 200],
      [213, 62, 79, 200],
    ],
  })

  return (
    <>
      <DeckGLMap
        layers={[heatmapLayer]}
        style={{ height: '100%', position: 'absolute' }}
        initialViewState={{
          longitude: props.initLatLng.lng,
          latitude: props.initLatLng.lat,
          zoom: 12,
          pitch: 0,
          bearing: 0,
        }}
      />
    </>
  )
}

export default HeatmapMap
