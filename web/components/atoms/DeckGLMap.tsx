import DeckGL from '@deck.gl/react'
import { LayersList, PickingInfo } from '@deck.gl/core'
import { BitmapLayer } from '@deck.gl/layers'
import { TileLayer, GeoBoundingBox } from '@deck.gl/geo-layers'
import { ReactNode } from 'react'

type Props = {
  initialViewState: {
    longitude: number
    latitude: number
    zoom: number
    pitch: number
    bearing: number
  }
  layers: LayersList
  style?: Partial<CSSStyleDeclaration>
  onClick?: (info: PickingInfo) => void
  children?: ReactNode
}

const DeckGLMap = (props: Props) => {
  const tileLayer = new TileLayer({
    data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    minZoom: 0,
    maxZoom: 19,
    tileSize: 128,
    renderSubLayers: (props) => {
      const { bbox } = props.tile
      const bounds = bbox as GeoBoundingBox
      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [bounds.west, bounds.south, bounds.east, bounds.north],
      })
    },
  })

  return (
    <DeckGL
      style={props.style}
      initialViewState={props.initialViewState}
      controller={true}
      layers={[tileLayer, ...props.layers]}
      onClick={props.onClick}
    >
      {props.children}
      <div className='attribution'>
        <a
          href={'http://www.openstreetmap.org/about/'}
          target='_blank'
          rel='noreferrer'
        >
          © OpenStreetMap
        </a>
      </div>
    </DeckGL>
  )
}

export default DeckGLMap
