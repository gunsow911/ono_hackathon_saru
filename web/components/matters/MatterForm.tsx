import LatLngMapForm from 'components/atoms/LatLngMapForm'
import React from 'react'
import { Form } from 'react-bootstrap'

const MatterForm = () => {
  return (
    <Form.Group>
      <div className='fullscreen-map' style={{ position: 'relative' }}>
        <LatLngMapForm name='latLng' />
      </div>
    </Form.Group>
  )
}

export default MatterForm
