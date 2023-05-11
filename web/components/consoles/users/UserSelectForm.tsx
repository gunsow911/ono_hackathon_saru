import SelectForm from 'components/atoms/SelectForm'
import React from 'react'

const UserSelectForm = () => {
  return (
    <>
      <SelectForm name='userId' label='ユーザー名'>
        <option>hoge</option>
      </SelectForm>
    </>
  )
}

export default UserSelectForm
