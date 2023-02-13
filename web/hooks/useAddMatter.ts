import useAxios from 'axios-hooks'
import { Matter } from '../models/Matter'

export type AddMatterForm = {
  lat: number
  lng: number
}

const useAddMatter = () => {
  const [{ data, loading, error }, exec] = useAxios<Matter>({
    url: `/api/matters`,
    method: 'POST',
  })

  const execute = (form: AddMatterForm) => {
    exec({
      data: {
        lat: form.lat,
        lng: form.lng,
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
