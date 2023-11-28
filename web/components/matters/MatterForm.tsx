import CheckForm from 'components/atoms/CheckForm'
import InputForm from 'components/atoms/InputForm'
import LatLngMapForm from 'components/atoms/LatLngMapForm'
import SelectForm from 'components/atoms/SelectForm'
import React from 'react'
import { Alert, Col, Form, Row } from 'react-bootstrap'

const MatterForm = () => {
  // 群れの規模選択肢
  const scaleTypeOptions = [
    { value: 'SINGLE', label: '単独' },
    { value: 'GROUP', label: '群れ' },
    { value: 'UNKNOWN', label: 'わからない' },
  ]

  // 出現時間選択肢
  const hourOptions = [
    { value: '00:00:00', label: '0時ごろ' },
    { value: '01:00:00', label: '1時ごろ' },
    { value: '02:00:00', label: '2時ごろ' },
    { value: '03:00:00', label: '3時ごろ' },
    { value: '04:00:00', label: '4時ごろ' },
    { value: '05:00:00', label: '5時ごろ' },
    { value: '06:00:00', label: '6時ごろ' },
    { value: '07:00:00', label: '7時ごろ' },
    { value: '08:00:00', label: '8時ごろ' },
    { value: '09:00:00', label: '9時ごろ' },
    { value: '10:00:00', label: '10時ごろ' },
    { value: '11:00:00', label: '11時ごろ' },
    { value: '12:00:00', label: '12時ごろ' },
    { value: '13:00:00', label: '13時ごろ' },
    { value: '14:00:00', label: '14時ごろ' },
    { value: '15:00:00', label: '15時ごろ' },
    { value: '16:00:00', label: '16時ごろ' },
    { value: '17:00:00', label: '17時ごろ' },
    { value: '18:00:00', label: '18時ごろ' },
    { value: '19:00:00', label: '19時ごろ' },
    { value: '20:00:00', label: '20時ごろ' },
    { value: '21:00:00', label: '21時ごろ' },
    { value: '22:00:00', label: '22時ごろ' },
    { value: '23:00:00', label: '23時ごろ' },
  ]

  return (
    <Form.Group>
      <Row>
        <Col>
          <div className='fullscreen-map' style={{ position: 'relative' }}>
            <LatLngMapForm name='latLng' />
          </div>
        </Col>
      </Row>
      <Row className='pt-2'>
        <Col>
          <Form.Label>日時</Form.Label>
          <Row className='g-1'>
            <Col>
              <InputForm type='date' name='dateString' />
            </Col>
            <Col>
              <SelectForm name='timeString' options={hourOptions} />
            </Col>
          </Row>
        </Col>
        <Col>
          <SelectForm
            name='scaleType'
            options={scaleTypeOptions}
            label={'頭数'}
          />
        </Col>
      </Row>
      <Row className='pt-2'>
        <Col>
          <Alert variant='warning'>
            <CheckForm name='isDamaged' label='農業被害がありましたか？' />
          </Alert>
        </Col>
      </Row>
    </Form.Group>
  )
}

export default MatterForm
