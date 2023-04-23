import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { Matter } from 'models/Matter'
import * as yup from 'yup'

export type UpdateMatterForm = {
  appliedAt: string
  lat: number
  lng: number
}

export const matterSchema = yup.object<UpdateMatterForm>().shape({
  appliedAt: yup.date().required(),
  lat: yup.number().required(),
  lng: yup.number().required(),
})

/**
 * 獣害情報更新フック
 */
const useUpdateMatter = () => {
  const [{ loading, error }, exec] = useAxios<Matter>({
    method: 'PUT',
  })

  const execute = (matterId: string, form: UpdateMatterForm) => {
    return exec({
      url: `/api/console/matters/${matterId}`,
      data: {
        ...form,
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
