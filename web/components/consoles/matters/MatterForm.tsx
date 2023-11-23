import InputForm from 'components/atoms/InputForm'
import LatLngMapForm from 'components/atoms/LatLngMapForm'
import SelectForm from 'components/atoms/SelectForm'
import React from 'react'
import { Form } from 'react-bootstrap'

  // 群れの規模選択肢
  const single = { value: 'single', label: '単独' }
  const group = { value: 'group', label: '群れ' }

  // 出現時間帯選択肢
  const earlymorning = { value: 'earlymorning', label: '早朝' }
  const morning = { value: 'morning', label: '朝' }
  const noon = { value: 'noon', label: '昼' }
  const evening = { value: 'evening', label: '夕方' }
  const night = { value: 'night', label: '夜' }

const MatterForm = () => {
  return (
    <>
      {/* <Form.Group className='py-2'>
        <InputForm type='date' name='appliedAt' label='日付' />
      </Form.Group> */}
      <Form.Group className='py-2'>
        <div style={{ height: '300px', position: 'relative' }}>
          <LatLngMapForm name='latLng' label='位置情報' />
        </div>
        <div className='pt-4'>
          <SelectForm
            name={'numberSelect'}
            options={[single, group]}
            label={'頭数'}
          />
        </div>
        <div className='pt-2'>
          <InputForm type='date' name='appliedAt' label='日付' />
        </div>
        <div className='pt-2'>
          <SelectForm
            name={'timeSelect'}
            options={[earlymorning, morning, noon, evening, night]}
            label={'出現時間帯'}
          />
        </div>
      </Form.Group>
    </>
  )
}

export default MatterForm
