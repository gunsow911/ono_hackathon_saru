import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { Matter } from 'models/Matter'
import * as yup from 'yup'

export type UpdateUserForm = {
  name: string
  description: string
}

export const matterSchema = yup.object<UpdateUserForm>().shape({
  appliedAt: yup.date().required(),
  lat: yup.number().required(),
  lng: yup.number().required(),
})

/**
 * ユーザー情報更新フック
 */
const useUpdateMatter = () => {
  const [{ loading, error }, exec] = useAxios<Matter>({
    method: 'PUT',
  })

  const execute = (matterId: string, form: UpdateUserForm) => {
    return exec({
      url: `/api/console/matters/${matterId}`,
      data: {
        ...form,
        // appliedAt: dayjs(form.appliedAt).format('YYYY-MM-DD'),
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
