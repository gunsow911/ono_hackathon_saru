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
    <Form.Group>
      <div className='fullscreen-map' style={{ position: 'relative' }}>
        <LatLngMapForm name='latLng' />
      </div>
      <div className='pt-4'>
        <SelectForm
          name={'numberSelect'}
          options={[single, group]}
          label={'頭数'}
        />
      </div>
      <div className='pt-4'>
        <SelectForm
          name={'timeSelect'}
          options={[earlymorning, morning, noon, evening, night]}
          label={'出現時間'}
        />
      </div>
    </Form.Group>
  )
}

export default MatterForm
