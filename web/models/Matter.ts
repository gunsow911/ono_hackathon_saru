import { User } from './User'

export type Matter = {
  id: string
  lat: number
  lng: number
  appliedAt: string
  userId: string
  user?: User
}
