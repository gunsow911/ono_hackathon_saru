import { ColumnDef } from '@tanstack/react-table'
import PaginationTable from 'components/atoms/PaginationTable'
import dayjs from 'dayjs'
import useGetMatterPage, {
  Condition,
} from 'hooks/console/matter/useGetMatterPage'
import useRemoveMatter from 'hooks/console/matter/useRemoveMatter'
import { Matter } from 'models/Matter'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

type Props = {
  condition?: Condition
  onRemove?: (matterId: string) => void
  onChangeSelects?: (selects: string[]) => void
}

const MatterTable = (props: Props) => {
  const [page, setPage] = useState(1)
  const { data, isLoading, mutate } = useGetMatterPage(page, props.condition)
  const { execute: executeRemove } = useRemoveMatter()

  const onRemove = (matterId: string) => {
    executeRemove(matterId).then((_) => {
      // 削除後に獣害情報一覧を再取得する
      mutate()
      toast.success('獣害情報を削除しました。')
      props.onRemove && props.onRemove(matterId)
    })
  }

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
          return (
            <Link href={`/console/users/${v.row.original.user?.id}`}>
              {v.row.original.user?.name}
            </Link>
          )
        },
      },
      {
        accessorKey: 'lat',
        header: '緯度',
        enableSorting: false,
        cell: (v) => {
          return v.row.original.latLng.lat
        },
      },
      {
        accessorKey: 'lng',
        header: '経度',
        enableSorting: false,
        cell: (v) => {
          return v.row.original.latLng.lng
        },
      },
      {
        accessorKey: 'operation',
        header: '操作',
        enableSorting: false,
        cell: (value) => {
          // 引数のvalueには行の情報が入っているので、獣害情報のIDを取得できます
          const matterId = value.row.original.id
          return (
            <>
              <Link href={`/console/matters/${matterId}`}>
                <Button size='sm' variant='info' className='mx-1'>
                  詳細
                </Button>
              </Link>
              <Button
                size='sm'
                variant='danger'
                className='mx-1'
                onClick={() => onRemove(matterId)}
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
      selectMode={true}
      // どの行が選択されているか
      onChangeSelects={(selectedIds: string[]) => console.log(selectedIds)}
    ></PaginationTable>
  )
}

export default MatterTable
