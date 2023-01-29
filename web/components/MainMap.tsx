import { HeatmapLayer } from '@deck.gl/aggregation-layers/typed'
import useHeatmapData, { Information } from '../hooks/useHeatmapData'
import DeckGLMap from './DeckGLMap'

const MainMap = () => {
  const { data } = useHeatmapData()

  const heatmapLayer = new HeatmapLayer<Information>({
    id: 'heatmapLayer',
    data,
    getPosition: (d) => d.coordinate,
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
    <DeckGLMap
      layers={[heatmapLayer]}
      style={{ height: '80vh' }}
      initialViewState={{
        longitude: 131.3046877,
        latitude: 34.1046934,
        zoom: 12,
        pitch: 0,
        bearing: 0,
      }}
    />
  )
}

export default MainMap
