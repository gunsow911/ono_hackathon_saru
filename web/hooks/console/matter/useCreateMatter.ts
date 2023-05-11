import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import { Matter } from 'models/Matter'
import * as yup from 'yup'

export type CreateMatterForm = {
  userId: string
  appliedAt: string
  latLng: LatLng
}

export const matterSchema = yup.object<CreateMatterForm>().shape({
  appliedAt: yup.date().required(),
})

/**
 * 獣害情報作成フック
 */
const useCreateMatter = () => {
  const [{ loading, error }, exec] = useAxios<Matter>({
    method: 'POST',
  })

  const execute = async (form: CreateMatterForm) => {
    return exec({
      url: `/api/console/matters`,
      data: {
        userId: form.userId,
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

export default useCreateMatter
