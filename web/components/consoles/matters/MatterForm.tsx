import InputForm from 'components/atoms/CustomTable'
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
        <LatLngMapForm width='100%' name='latLng' label='位置情報' />
      </Form.Group>
    </>
  )
}

export default MatterForm
