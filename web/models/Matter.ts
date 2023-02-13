import { User } from './User'

export type Matter = {
  id: string
  lat: number
  lng: number
  appliedAt: Date
  userId: string
  user?: User
}
