import { HeatmapLayer } from '@deck.gl/aggregation-layers/typed'
import useHeatmapData, { Information } from '../hooks/useHeatmapData'
import DeckGLMap from './DeckGLMap'

const MainMap = () => {
  const { data } = useHeatmapData()

  const heatmapLayer = new HeatmapLayer<Information>({
    id: 'heatmapLayer',
    data,
    getPosition: (d) => d.coordinate,
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
