import { ColumnDef } from '@tanstack/react-table'
import PaginationTable from 'components/atoms/PaginationTable'
import useGetUserPage from 'hooks/console/user/useGetUserPage'
import { User } from 'models/User'
import React, { useMemo } from 'react'
import { Button } from 'react-bootstrap'

type Props = {}

const UserTable = (props: Props) => {
  const { data } = useGetUserPage()

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

  return <PaginationTable columns={columns} pagination={data}></PaginationTable>
}

export default UserTable