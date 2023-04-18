import React from 'react'
import { Pagination } from 'react-bootstrap'

type Props = {
  currentPage: number
  from: number
  lastPage: number
  path: string
  perPage: number
  to: number
  total: number
  canPreviousPage: boolean
  canNextPage: boolean
  onChangePage?: (page: number) => void
}

/**
 * ページネーションリンク
 */
const PaginationLink = (props: Props) => {
  /**
   * ページネーションのページ分割を取得
   */
  const getRangeOptions = (
    current: number,
    last: number,
    delta: number = 2,
  ) => {
    const left = current - delta
    const right = current + delta + 1
    const range: number[] = []
    const rangeWithBlank: (number | null)[] = []

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i)
      }
    }

    let prev: number | undefined = undefined
    for (const i of range) {
      if (prev !== undefined) {
        if (i - prev === 2) {
          rangeWithBlank.push(prev + 1)
        } else if (i - prev !== 1) {
          rangeWithBlank.push(null)
        }
      }
      rangeWithBlank.push(i)
      prev = i
    }
    return rangeWithBlank
  }

  return (
    <>
      <div className='text-muted me-3'>
        {props.total}件中{props.from}-{props.to}表示
      </div>
      <Pagination className='mb-0'>
        <Pagination.Item
          disabled={!props.canPreviousPage}
          onClick={() => props.onChangePage && props.onChangePage(0)}
        >
          &lt;&lt;
        </Pagination.Item>
        <Pagination.Item
          disabled={!props.canPreviousPage}
          onClick={() =>
            props.onChangePage && props.onChangePage(props.currentPage - 2)
          }
        >
          &lt;
        </Pagination.Item>
        {getRangeOptions(props.currentPage, props.lastPage).map((v, index) => {
          if (v === null) {
            return (
              <Pagination.Item disabled key={`pagination_link_${index}`}>
                ...
              </Pagination.Item>
            )
          }
          return (
            <Pagination.Item
              key={`pagination_link_${index}`}
              active={props.currentPage === v}
              onClick={() => props.onChangePage && props.onChangePage(v - 1)}
            >
              {v}
            </Pagination.Item>
          )
        })}
        <Pagination.Item
          disabled={!props.canNextPage}
          onClick={() =>
            props.onChangePage && props.onChangePage(props.currentPage)
          }
        >
          &gt;
        </Pagination.Item>
        <Pagination.Item
          disabled={!props.canNextPage}
          onClick={() =>
            props.onChangePage && props.onChangePage(props.lastPage - 1)
          }
        >
          &gt;&gt;
        </Pagination.Item>
      </Pagination>
    </>
  )
}

export default PaginationLink
