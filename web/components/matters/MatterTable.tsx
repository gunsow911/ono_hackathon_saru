import { ColumnDef } from '@tanstack/react-table'
import PaginationTable from 'components/atoms/PaginationTable'
import dayjs from 'dayjs'
import useGetMatterPage from 'hooks/console/matter/useGetMatterPage'
import { Matter } from 'models/Matter'
import React, { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'

const MatterTable = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetMatterPage(page)

  const columns: ColumnDef<Matter>[] = useMemo(() => {
    const columns: ColumnDef<Matter>[] = [
      {
        accessorKey: 'appliedAt',
        header: '日付',
        enableSorting: false,
        cell: (v) => {
          return dayjs(v.row.original.appliedAt).format('YYYY-MM-DD')
        },
      },
      {
        accessorKey: 'user',
        header: 'ユーザー',
        enableSorting: false,
        cell: (v) => {
          return v.row.original.user?.name
        },
      },
      {
        accessorKey: 'lat',
        header: '緯度',
        enableSorting: false,
        cell: (v) => {
          return v.row.original.lat
        },
      },
      {
        accessorKey: 'lng',
        header: '経度',
        enableSorting: false,
        cell: (v) => {
          return v.row.original.lng
        },
      },
      {
        accessorKey: 'operation',
        header: '操作',
        enableSorting: false,
        cell: (_) => {
          return (
            <>
              <Button size='sm' variant='info' className='mx-1'>
                詳細
              </Button>
              <Button size='sm' variant='danger' className='mx-1'>
                削除
              </Button>
            </>
          )
        },
      },
    ]
    return columns
  }, [])

  return (
    <PaginationTable
      isLoading={isLoading}
      smallTable
      columns={columns}
      pagination={data}
      onPageChange={(page) => setPage(page)}
    ></PaginationTable>
  )
}

export default MatterTable
