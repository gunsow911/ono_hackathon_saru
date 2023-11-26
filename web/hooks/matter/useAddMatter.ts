import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { LatLng } from 'models/LatLng'
import { Matter } from 'models/Matter'

export type AddMatterForm = {
  latLng: LatLng
  numberSelect: string
  appliedAt: string
  timeSelect: string
}

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
        appliedAt: dayjs(form.appliedAt).format('YYYY-MM-DD'),
        numberSelect: form.numberSelect,
        timeSelect: form.timeSelect,
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
