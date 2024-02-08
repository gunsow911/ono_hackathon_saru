import useAxios from 'axios-hooks'
import dayjs from 'dayjs'
import { Matter } from 'models/Matter'
import { MatterInputForm } from 'hooks/matter/useAddMatter'

/**
 * 獣害情報更新フック
 */
const useUpdateMatter = () => {
  const [{ loading, error }, exec] = useAxios<Matter>({
    method: 'PUT',
  })

  const execute = async (matterId: string, form: MatterInputForm) => {
    return exec({
      url: `/api/console/matters/${matterId}`,
      data: {
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

export default useUpdateMatter
