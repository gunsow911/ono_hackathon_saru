import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import { Matter, ScaleType } from 'models/Matter'
import yup from 'libs/yup'

export type AddMatterForm = {
  latLng: LatLng
  dateString: string
  timeString: string
  scaleType: ScaleType
  isDamaged: boolean
}

export const matterSchema = yup.object<AddMatterForm>().shape({
  dateString: yup.string().required().label('日付'),
  timeString: yup.string().required().label('時間'),
  scaleType: yup.string().required().label('頭数'),
  isDamaged: yup.bool().required().label('農業被害'),
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
