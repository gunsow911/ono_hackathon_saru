import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { Matter } from 'models/Matter'
import yup from 'libs/yup'
import { MatterInputForm, matterSchema } from 'hooks/matter/useAddMatter'

export type MatterWithUserIdInputForm = {
  userId: string
} & MatterInputForm

export const matterWithUserIdSchema = matterSchema.concat(
  yup.object<MatterWithUserIdInputForm>().shape({
    userId: yup.string().required().label('ユーザーID'),
  }),
)

/**
 * 獣害情報作成フック
 */
const useAddMatter = () => {
  const [{ loading, error }, exec] = useAxios<Matter>({
    method: 'POST',
  })

  const execute = async (form: MatterWithUserIdInputForm) => {
    return exec({
      url: `/api/console/matters`,
      data: {
        userId: form.userId,
        lat: form.latLng.lat,
        lng: form.latLng.lng,
        appliedAt: dayjs(`${form.dateString} ${form.timeString}`).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
        animalCount: form.animalCount,
        appearType: form.appearType,
        isDamaged: form.isDamaged,
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
