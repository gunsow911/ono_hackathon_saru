import { LatLng } from './LatLng'
import { User } from './User'

/**
 * 群れの規模
 */
export type ScaleType = 'UNKNOWN' | 'SINGLE' | 'GROUP'

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
  scaleType: ScaleType
  damageType: DamageType
}
