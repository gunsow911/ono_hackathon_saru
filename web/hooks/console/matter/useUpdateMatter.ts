import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import { Matter, ScaleType } from 'models/Matter'
import yup from 'libs/yup'

export type UpdateMatterForm = {
  latLng: LatLng
  dateString: string
  timeString: string
  scaleType: ScaleType
  isDamaged: boolean
}

export const matterSchema = yup.object<UpdateMatterForm>().shape({
  dateString: yup.string().required().label('日付'),
  timeString: yup.string().required().label('時間'),
  scaleType: yup.string().required().label('頭数'),
  isDamaged: yup.bool().required().label('農業被害'),
})

/**
 * 獣害情報更新フック
 */
const useUpdateMatter = () => {
  const [{ loading, error }, exec] = useAxios<Matter>({
    method: 'PUT',
  })

  const execute = async (matterId: string, form: UpdateMatterForm) => {
    return exec({
      url: `/api/console/matters/${matterId}`,
      data: {
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
    execute,
    loading,
    error,
  }
}

export default useUpdateMatter
