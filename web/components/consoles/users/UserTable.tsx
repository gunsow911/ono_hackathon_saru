import { ColumnDef } from '@tanstack/react-table'
import PaginationTable from 'components/atoms/PaginationTable'
import useGetUserPage, { Condition } from 'hooks/console/user/useGetUserPage'
import useRemoveUser from 'hooks/console/user/useRemoveUser'
import { User } from 'models/User'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

type Props = {
  condition?: Condition
  onRemove?: (userId: string) => void
}

const UserTable = (props: Props) => {
  const [page, setPage] = useState(1)
  const { data, isLoading, mutate } = useGetUserPage(page, props.condition)
  const { execute: executeRemove } = useRemoveUser()

  const onRemove = (userId: string) => {
    executeRemove(userId).then((_) => {
      // 削除後にユーザー情報一覧を再取得する
      mutate()
      toast.success('ユーザー情報を削除しました。')
      props.onRemove && props.onRemove(userId)
    })
  }

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
              <Button
                size='sm'
                variant='danger'
                className='mx-1'
                onClick={() => onRemove(userId)}
              >
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

export default UserTable
