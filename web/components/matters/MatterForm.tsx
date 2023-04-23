import InputForm from 'components/atoms/CustomTable'
import React from 'react'
import { Form } from 'react-bootstrap'

const MatterForm = () => {
  return (
    <>
      <Form.Group className='py-2'>
        <InputForm name='appliedAt' label='日付'></InputForm>
      </Form.Group>
      <Form.Group className='py-2'>
        <InputForm name='lat' label='緯度'></InputForm>
        <InputForm name='lng' label='経度'></InputForm>
      </Form.Group>
    </>
  )
}

export default MatterForm
