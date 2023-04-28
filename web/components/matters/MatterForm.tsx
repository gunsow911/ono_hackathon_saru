import LatLngMapForm from 'components/atoms/LatLngMapForm'
import React from 'react'
import { Form } from 'react-bootstrap'

const MatterForm = () => {
  return (
    <>
      <Form.Group className='py-2'>
        <LatLngMapForm width='100%' name='latLng' />
      </Form.Group>
    </>
  )
}

export default MatterForm
