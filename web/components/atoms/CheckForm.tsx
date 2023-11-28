import { Form } from 'react-bootstrap'
import { get, useController, useFormContext } from 'react-hook-form'

type Props = {
  name: string
  label?: string
}

/**
 * チェックボックスフォーム
 */
const CheckForm = (props: Props) => {
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
      <Form.Check
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

export default CheckForm
