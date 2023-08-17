import InputForm from 'components/atoms/InputForm'
import LatLngMapForm from 'components/atoms/LatLngMapForm'
import React from 'react'
import { Form } from 'react-bootstrap'

const MatterForm = () => {
  return (
    <>
      <Form.Group className='py-2'>
        <InputForm type='date' name='appliedAt' label='日付' />
      </Form.Group>
      <Form.Group className='py-2'>
        <div style={{ height: '300px', position: 'relative' }}>
          <LatLngMapForm name='latLng' label='位置情報' />
        </div>
      </Form.Group>
    </>
  )
}

export default MatterForm
