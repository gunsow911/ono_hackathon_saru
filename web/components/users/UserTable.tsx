import { ColumnDef } from '@tanstack/react-table'
import PaginationTable from 'components/atoms/PaginationTable'
import useGetUserPage from 'hooks/console/user/useGetUserPage'
import { User } from 'models/User'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'

type Props = {}

const UserTable = (props: Props) => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetUserPage(page)

  const router = useRouter()
  const { userId, editUserId } = router.query
  const editedUserId = userId as string
  /**
   * 各行の編集ボタンのクリック時
   * @param user 選択されたユーザー
   */
  const edit = (user: User) => {
    router.push(
      {
        pathname: `/users/${userId}`,
        query: { editUserId: user.id },
      },
      undefined,
      { scroll: false },
    )
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
        cell: (_) => {
          return (
            <>
              <Button size='sm' variant='info' className='mx-1'>
                詳細
              </Button>
              <Button size='sm' variant='primary' className='mx-1' edit={edit}>
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
