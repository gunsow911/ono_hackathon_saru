import SelectForm from 'components/atoms/SelectForm'
import useGetUserSelectList from 'hooks/console/user/useGetUserSelectList'
import React from 'react'

const UserSelectForm = () => {
  const { data } = useGetUserSelectList()
  return (
    <>
      <SelectForm name='userId' label='ユーザー名'>
        {data?.map((select) => {
          return (
            <option key={select.id} value={select.id}>
              {select.name}
            </option>
          )
        })}
      </SelectForm>
    </>
  )
}

export default UserSelectForm
