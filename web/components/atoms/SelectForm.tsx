import { Form, FormSelectProps } from 'react-bootstrap'
import { get, useController, useFormContext } from 'react-hook-form'

type Props = {
  name: string
  label?: string
} & FormSelectProps

/**
 * 選択フォーム
 */
const SelectForm = (props: Props) => {
  const { name, label, ...formControlProps } = props
  const { control } = useFormContext()
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  })
  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select
        {...field}
        {...formControlProps}
        isInvalid={!!get(errors, name)}
      />
    </>
  )
}

export default SelectForm
