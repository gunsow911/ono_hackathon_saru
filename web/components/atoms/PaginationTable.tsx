import {
  ColumnDef,
  ColumnSort,
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  Header,
  RowSelectionState,
  SortDirection,
  useReactTable,
} from '@tanstack/react-table'
import { Pagination } from 'models/Pagination'
import { CSSProperties, useEffect, useMemo, useState } from 'react'
import { Table } from 'react-bootstrap'
import PaginationLink from './PaginationLink'
import { BsSortDown, BsSortUp } from 'react-icons/bs'
import Checkbox from 'react-three-state-checkbox'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData, TValue> {
    align?: 'start' | 'end' | 'center'
  }
}

interface Identifiable {
  id: string
}

type Props<T extends object> = {
  pagination?: Pagination<T>
  isLoading?: boolean
  columns: ColumnDef<T>[]
  sort?: ColumnSort
  onSortChange?: (sort?: ColumnSort) => void
  onPageChange?: (page: number) => void
  smallTable?: boolean
  selectMode?: boolean
  onChangeSelects?: (selects: string[]) => void
}

/**
 * 汎用的なページングテーブルコンポーネント
 */
const PaginationTable = <T extends object>(props: Props<T>) => {
  // 選択リスト状態
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = useMemo(() => {
    if (props.selectMode) {
      const selectColumn: ColumnDef<T> = {
        id: '__select__',
        header: (v) => (
          <div className='text-center'>
            <Checkbox
              checked={v.table.getIsAllRowsSelected()}
              indeterminate={v.table.getIsSomeRowsSelected()}
              onChange={v.table.getToggleAllRowsSelectedHandler()}
            />
          </div>
        ),
        cell: (v) => (
          <div className='text-center'>
            <Checkbox
              checked={v.row.getIsSelected()}
              onChange={v.row.getToggleSelectedHandler()}
            />
          </div>
        ),
        enableSorting: false,
      }
      return [selectColumn, ...props.columns]
    }
    return [...props.columns]
  }, [props.selectMode])

  // テーブルフックの作成
  const {
    getHeaderGroups,
    getRowModel,
    getCanNextPage,
    getCanPreviousPage,
    getSelectedRowModel,
    setPageIndex,
  } = useReactTable({
    columns: columns,
    data: props.pagination?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    enableMultiSort: false,
    enableRowSelection: props.selectMode,
    pageCount: props.pagination?.meta.lastPage ?? -1,
    state: {
      sorting: props.sort ? [props.sort] : [],
      pagination: {
        pageIndex: props.pagination ? props.pagination.meta.currentPage - 1 : 0,
        pageSize: props.pagination?.meta.perPage ?? 20,
      },
      rowSelection: rowSelection,
    },
    onSortingChange: (updater) => {
      if (!props.onSortChange) return
      const newSort = functionalUpdate(updater, props.sort ? [props.sort] : [])
      props.onSortChange(newSort[0] ? newSort[0] : undefined)
    },
    onPaginationChange: (updater) => {
      if (!props.onPageChange) return
      const newPagination = functionalUpdate(
        updater,
        props.pagination
          ? {
              pageIndex: props.pagination.meta.currentPage - 1,
              pageSize: props.pagination.meta.perPage,
            }
          : { pageIndex: 0, pageSize: 20 },
      )
      props.onPageChange(newPagination.pageIndex + 1)
    },
    onRowSelectionChange: setRowSelection,
  })

  useEffect(() => {
    if (!props.selectMode) return
    const ids = getSelectedRowModel().rows.map((v) => {
      const identifiable = v.original as Identifiable
      return identifiable.id
    })
    props.onChangeSelects && props.onChangeSelects(ids)
  }, [rowSelection, props.selectMode])

  const getHeaderStyle = (header: Header<T, unknown>): CSSProperties => {
    if (header.column.getIsSorted() === false) {
      return {
        cursor: header.column.getCanSort() ? 'pointer' : 'auto',
      }
    }
    return {
      cursor: header.column.getCanSort() ? 'pointer' : 'auto',
    }
  }

  const sortingButton = (direction: false | SortDirection) => {
    if (direction === false) {
      return <></>
    }
    if (direction === 'asc') {
      return <BsSortUp />
    }
    if (direction === 'desc') {
      return <BsSortDown />
    }
  }

  return (
    <>
      <Table
        striped
        bordered
        responsive
        size={props.smallTable ? 'sm' : undefined}
      >
        <thead color='light'>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={getHeaderStyle(header)}
                  className={
                    header.column.columnDef.meta?.align
                      ? `text-${header.column.columnDef.meta?.align} align-middle fw-normal`
                      : 'align-middle fw-normal'
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  {header.column.columnDef.enableSorting !== false &&
                    sortingButton(header.column.getIsSorted())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {(props.isLoading && props.pagination === undefined) ||
          props.pagination?.meta.total === 0 ? (
            <tr>
              <td colSpan={props.columns.length}>
                <div className='small text-muted text-center'>
                  {props.pagination === undefined && 'データをロード中です。'}
                  {props.pagination?.meta.total === 0 && 'データはありません。'}
                </div>
              </td>
            </tr>
          ) : (
            getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={
                        cell.column.columnDef.meta?.align
                          ? `text-${cell.column.columnDef.meta?.align}`
                          : ''
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </Table>
      {props.pagination && (
        <div className='d-flex justify-content-end align-items-center'>
          <PaginationLink
            {...props.pagination.meta}
            canNextPage={getCanNextPage()}
            canPreviousPage={getCanPreviousPage()}
            onChangePage={(page) => setPageIndex(page)}
          ></PaginationLink>
        </div>
      )}
    </>
  )
}

export default PaginationTable
