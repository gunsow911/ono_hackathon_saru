import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import { Matter } from 'models/Matter'
import * as yup from 'yup'

export type AddMatterForm = {
  userId: string
  appliedAt: string
  latLng: LatLng
}

export const matterSchema = yup.object<AddMatterForm>().shape({
  appliedAt: yup.date().required(),
  userId: yup.string().required(),
})

/**
 * 獣害情報作成フック
 */
const useAddMatter = () => {
  const [{ loading, error }, exec] = useAxios<Matter>({
    method: 'POST',
  })

  const execute = async (form: AddMatterForm) => {
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

export default useAddMatter
