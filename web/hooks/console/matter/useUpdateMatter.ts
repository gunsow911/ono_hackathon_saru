import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import { Matter } from 'models/Matter'
import * as yup from 'yup'

export type UpdateMatterForm = {
  appliedAt: string
  latLng: LatLng
}

export const matterSchema = yup.object<UpdateMatterForm>().shape({
  appliedAt: yup.date().required(),
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
