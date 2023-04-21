import { ColumnDef } from '@tanstack/react-table'
import PaginationTable from 'components/atoms/PaginationTable'
import { Pagination } from 'models/Pagination'
import { User } from 'models/User'
import React, { useMemo } from 'react'
import { Button } from 'react-bootstrap'

type Props = {}

const UserTable = (props: Props) => {
  const columns: ColumnDef<User>[] = useMemo(() => {
    const columns: ColumnDef<User>[] = [
      {
        accessorKey: 'name',
        header: '名前',
        enableSorting: false,
        cell: (v) => {
          return v.row.original.name
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

  //仮データ
  const pagination: Pagination<User> = {
    data: [
      {
        id: 'e6903c19-0b3e-4157-8a64-497762cb5b1b',
        name: 'テスト太郎',
        createdAt: '2023-04-01',
        updatedAt: '2023-04-01',
      },
      {
        id: 'c9d5f476-455c-45b8-97eb-f8bc4063f30a',
        name: 'テスト次郎',
        createdAt: '2023-03-01',
        updatedAt: '2023-03-01',
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

export default UserTable
