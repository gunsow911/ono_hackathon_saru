import { HeatmapLayer } from '@deck.gl/aggregation-layers/typed'
import DeckGLMap from 'components/atoms/DeckGLMap'
import useListMatter from 'hooks/matter/useListMatter'
import { Matter } from 'models/Matter'

const MainMap = () => {
  const { data } = useListMatter()

  const heatmapLayer = new HeatmapLayer<Matter>({
    id: 'heatmapLayer',
    data,
    getPosition: (d) => [d.latLng.lng, d.latLng.lat],
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
      style={{ height: '100%', position: 'relative' }}
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
