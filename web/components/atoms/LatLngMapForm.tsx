import React, { useEffect, useState } from 'react'
import DeckGLMap from '../atoms/DeckGLMap'
import { IconLayer } from '@deck.gl/layers/typed'
import { useController, useFormContext } from 'react-hook-form'
import { LatLng } from 'models/LatLng'
import { Form } from 'react-bootstrap'

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 64, height: 64, anchorY: 64 },
}

type Props = {
  name: string
  label?: string
  width?: string
  height?: string
}

/**
 * マップ上でピンを使って緯度経度を指定できるフォーム
 */
const LatLngMapForm = (props: Props) => {
  const [initLatLng, setInitLatLng] = useState<LatLng>()

  const { name } = props
  const { control } = useFormContext()
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  })
  useEffect(() => {
    if (initLatLng) {
      return
    }
    setInitLatLng(value)
  }, [value])

  const iconLayer = new IconLayer<[number, number]>({
    id: 'icon-layer',
    data: [[value.lng, value.lat]],
    iconAtlas: '/image/marker.png',
    iconMapping: ICON_MAPPING,
    getIcon: (_) => 'marker',
    sizeScale: 1,
    getPosition: (d) => d,
    getSize: (_) => 32,
  })

  return (
    <>
      {props.label && <Form.Label>{props.label}</Form.Label>}
      {initLatLng && (
        <DeckGLMap
          layers={[iconLayer]}
          style={{
            width: props.width ? props.width : '400px',
            height: props.height ? props.height : '300px',
            position: 'relative',
          }}
          initialViewState={{
            longitude: initLatLng.lng,
            latitude: initLatLng.lat,
            zoom: 16,
            pitch: 0,
            bearing: 0,
          }}
          onClick={(info) =>
            info.coordinate &&
            onChange({ lat: info.coordinate[1], lng: info.coordinate[0] })
          }
        />
      )}
    </>
  )
}

export default LatLngMapForm
