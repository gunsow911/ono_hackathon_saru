import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import { ApperType, Matter } from 'models/Matter'
import yup from 'libs/yup'

export type AddMatterForm = {
  latLng: LatLng
  dateString: string
  timeString: string
  animalCount: number
  apperType: ApperType
  isDamaged: boolean
}

export const matterSchema = yup.object<AddMatterForm>().shape({
  animalCount: yup
    .number()
    .min(0)
    .max(999)
    .required('数字を入力してください。')
    .typeError('頭数は数値を入力してください。')
    .label('頭数'),
  dateString: yup.string().required().label('日付'),
  timeString: yup.string().required().label('時間'),
})

const useAddMatter = () => {
  const [{ data, loading, error }, exec] = useAxios<Matter>({
    url: `/api/matters`,
    method: 'POST',
  })

  const execute = (userId: string, form: AddMatterForm) => {
    return exec({
      data: {
        userId: userId,
        lat: form.latLng.lat,
        lng: form.latLng.lng,
        appliedAt: dayjs(`${form.dateString} ${form.timeString}`).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
        animalCount: form.animalCount,
        apperType: form.apperType,
        isDamaged: form.isDamaged,
      },
    })
  }

  return {
    data,
    execute,
    loading,
    error,
  }
}

export default useAddMatter
