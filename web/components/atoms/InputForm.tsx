import { Form, FormControlProps } from 'react-bootstrap'
import { get, useController, useFormContext } from 'react-hook-form'

type Props = {
  name: string
  label?: string
} & FormControlProps

/**
 * 入力フォーム
 */
const InputForm = (props: Props) => {
  const { name, ...formControlProps } = props
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
      {props.label !== undefined && <Form.Label>{props.label}</Form.Label>}
      <Form.Control
        {...field}
        {...formControlProps}
        isInvalid={!!get(errors, name)}
      />
      {get(errors, name) && (
        <Form.Control.Feedback type='invalid'>
          {get(errors, name).message?.toString()}
        </Form.Control.Feedback>
      )}
    </>
  )
}

export default InputForm
