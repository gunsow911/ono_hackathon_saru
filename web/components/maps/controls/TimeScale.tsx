import { Form } from 'react-bootstrap'
import SelectForm from 'components/atoms/SelectForm'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'

type Props = {
  onChange?: (between: { start: Dayjs; end: Dayjs }) => void
}

const TimeScale = (props: Props) => {
  const form = useForm<{ between: string }>({
    mode: 'onChange',
    defaultValues: {
      between: 'week',
    },
  })
  const options: { value: string; label: string }[] = [
    {
      label: '1日',
      value: 'day',
    },
    {
      label: '1週間',
      value: 'week',
    },
    {
      label: '1ヶ月',
      value: 'month',
    },
  ]

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (!value.between) {
        return
      }
      const now = dayjs().endOf('day')
      if (value.between === 'day') {
        const lastDay = now.add(-1, 'day').startOf('day')
        props.onChange && props.onChange({ start: lastDay, end: now })
        return
      }
      if (value.between === 'week') {
        const lastWeek = now.add(-1, 'week').startOf('day')
        props.onChange && props.onChange({ start: lastWeek, end: now })
        return
      }
      if (value.between === 'month') {
        const lastMonth = now.add(-1, 'month').startOf('day')
        props.onChange && props.onChange({ start: lastMonth, end: now })
        return
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  return (
    <div style={{ position: 'absolute', top: '1em', right: '1em' }}>
      <div
        style={{
          borderRadius: 5,
          backgroundColor: '#f8f9fa',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: '#aaaaaa',
        }}
        className='px-2 py-2'
      >
        <Form>
          <FormProvider {...form}>
            <div style={{ width: 130 }}>
              <label>表示期間</label>
              <SelectForm
                name='between'
                options={options}
                isSearchable={false}
              ></SelectForm>
            </div>
          </FormProvider>
        </Form>
      </div>
    </div>
  )
}

export default TimeScale
