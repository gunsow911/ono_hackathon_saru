import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import { Matter } from 'models/Matter'
import yup from 'libs/yup'

export type UpdateMatterForm = {
  latLng: LatLng
  numberSelect: string
  appliedAt: string
  timeSelect: string
}

export const matterSchema = yup.object<UpdateMatterForm>().shape({
  appliedAt: yup.date().required().label('日付'),
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
        appliedAt: dayjs(form.appliedAt).format('YYYY-MM-DD'),
        numberSelect: form.numberSelect,
        timeSelect: form.timeSelect,
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
