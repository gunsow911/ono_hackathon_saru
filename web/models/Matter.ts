import { LatLng } from './LatLng'
import { User } from './User'

/**
 * 出現種類
 */
export type AppearType = 'SEEING' | 'HEARING'

/**
 * 被害種類
 */
export type DamageType = 'UNKNOWN' | 'FARM'

/**
 * 獣害データ
 */
export type Matter = {
  id: string
  latLng: LatLng
  appliedAt: string
  userId: string
  user?: User
  appearType: AppearType
  animalCount: number
  damageType: DamageType
}
