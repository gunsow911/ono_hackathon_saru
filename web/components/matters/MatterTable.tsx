import { ColumnDef } from '@tanstack/react-table'
import PaginationTable from 'components/atoms/PaginationTable'
import dayjs from 'dayjs'
import { Matter } from 'models/Matter'
import { Pagination } from 'models/Pagination'
import React, { useMemo } from 'react'
import { Button } from 'react-bootstrap'

type Props = {}

const MatterTable = (props: Props) => {
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
              <Button size='sm' variant='primary' className='mx-1'>
                編集
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

  //仮データ
  const pagination: Pagination<Matter> = {
    data: [
      {
        id: '02d3698a-6ddd-4de3-9cf3-3d4f9f3acdb2',
        appliedAt: '2023-01-01',
        lat: 131.39889051460327,
        lng: 34.131567658362506,
        userId: 'e6903c19-0b3e-4157-8a64-497762cb5b1b',
        user: {
          id: 'e6903c19-0b3e-4157-8a64-497762cb5b1b',
          name: 'テスト太郎',
        },
      },
      {
        id: 'ce43c69d-d205-4af6-b196-038405b45358',
        appliedAt: '2023-01-20',
        lat: 131.39889051460327,
        lng: 34.131567658362506,
        userId: 'c9d5f476-455c-45b8-97eb-f8bc4063f30a',
        user: {
          id: 'c9d5f476-455c-45b8-97eb-f8bc4063f30a',
          name: 'テスト次郎',
        },
      },
    ],
    meta: {
      currentPage: 1,
      from: 1,
      lastPage: 1,
      path: '',
      perPage: 20,
      to: 2,
      total: 2,
    },
  }

  return (
    <PaginationTable
      columns={columns}
      pagination={pagination}
    ></PaginationTable>
  )
}

export default MatterTable
