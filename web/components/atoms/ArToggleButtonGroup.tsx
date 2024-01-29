import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'

type Props = {
  name: string
  label?: string
  options: { value: any; label: string }[]
}

/**
 * トグルボタングループ
 */
const ArToggleButtonGroup = (props: Props) => {
  const { name, label, ...formControlProps } = props
  const { control } = useFormContext()
  const { field } = useController({
    name,
    control,
  })

  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <br />
      <ToggleButtonGroup
        type='radio'
        name={name}
        value={field.value}
        onChange={field.onChange}
        {...formControlProps}
      >
        {props.options.map((option) => {
          return (
            <ToggleButton
              className='z-0'
              type='radio'
              key={option.value}
              id={`name-${option.value}`}
              value={option.value}
              variant='outline-primary'
            >
              {option.label}
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    </>
  )
}

export default ArToggleButtonGroup
