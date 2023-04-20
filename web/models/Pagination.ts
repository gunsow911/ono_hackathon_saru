export type Pagination<T> = {
  data: T[]
  meta: {
    currentPage: number
    from: number
    lastPage: number
    path: string
    perPage: number
    to: number
    total: number
  }
}
