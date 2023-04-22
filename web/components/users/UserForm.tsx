import InputForm from 'components/atoms/CustomTable'
import React from 'react'
import { Form } from 'react-bootstrap'

const UserForm = () => {
  return (
    <>
      <Form.Group className='py-2'>
        <InputForm
          name='name'
          label='ユーザー名'
          placeholder='ユーザー名'
        ></InputForm>
      </Form.Group>
      <Form.Group className='py-2'>
        <InputForm
          as='textarea'
          name='description'
          label='メモ'
          placeholder='メモ'
        ></InputForm>
      </Form.Group>
    </>
  )
}

export default UserForm
