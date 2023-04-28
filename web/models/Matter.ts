import { LatLng } from './LatLng'
import { User } from './User'

export type Matter = {
  id: string
  latLng: LatLng
  appliedAt: string
  userId: string
  user?: User
}
