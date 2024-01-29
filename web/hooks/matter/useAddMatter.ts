import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import { ApperType, Matter, ScaleType } from 'models/Matter'
import yup from 'libs/yup'

export type AddMatterForm = {
  latLng: LatLng
  dateString: string
  timeString: string
  scaleType: ScaleType
  apperType: ApperType
  isDamaged: boolean
}

export const matterSchema = yup.object<AddMatterForm>().shape({
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
        scaleType: form.scaleType,
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
