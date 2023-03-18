import { Form, FormControlProps } from 'react-bootstrap'
import { get, useController, useFormContext } from 'react-hook-form'

type Props = {
  name: string
} & FormControlProps

/**
 * 入力ボタン
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
      <Form.Control
        {...field}
        {...formControlProps}
        isInvalid={!!get(errors, name)}
      />
    </>
  )
}

export default InputForm
