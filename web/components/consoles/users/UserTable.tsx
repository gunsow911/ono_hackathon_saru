import { ColumnDef } from '@tanstack/react-table'
import PaginationTable from 'components/atoms/PaginationTable'
import useGetUserPage, { Condition } from 'hooks/console/user/useGetUserPage'
import { User } from 'models/User'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'

type Props = {
  condition?: Condition
  onRemove?: (userId: string) => void
}

const UserTable = (props: Props) => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetUserPage(page, props.condition)

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
        cell: (value) => {
          const userId = value.row.original.id
          return (
            <>
              <Link href={`/console/users/${userId}`}>
                <Button size='sm' variant='info' className='mx-1'>
                  詳細
                </Button>
              </Link>
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

export default UserTable
