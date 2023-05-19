import { Form } from 'react-bootstrap'
import { get, useController, useFormContext } from 'react-hook-form'
import Select from 'react-select'

type Props = {
  name: string
  label?: string
  options: { value: string; label: string }[]
}

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
      <Select
        {...field}
        {...formControlProps}
        options={props.options}
        placeholder='選択してください'
        isClearable
        onChange={(option) => field.onChange(option?.value ?? null)}
        value={props.options.filter((option) => field.value === option.value)}
        styles={{
          control: (base, state) => ({
            ...base,
            borderWidth: 1,
            borderColor: get(errors, name)
              ? '#dc3545'
              : state.isFocused
              ? '#86b7fe'
              : base.borderColor,
            '&:hover': {},
            boxShadow: get(errors, name)
              ? '0 0 0 0.25rem rgba(220,53,69,.25)'
              : state.isFocused
              ? '0 0 0 0.25rem rgba(13,110,253,.25)'
              : base.borderColor,
          }),
        }}
        className={`${get(errors, name) ? 'is-invalid' : ''}`}
      />
      {get(errors, name) && (
        <Form.Control.Feedback type='invalid'>
          {get(errors, name).message?.toString()}
        </Form.Control.Feedback>
      )}
    </>
  )
}

export default SelectForm
