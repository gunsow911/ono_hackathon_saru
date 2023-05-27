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
import { Button, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

type Props = {
  condition?: Condition
  onRemove?: (matterId: string) => void
}

const MatterTable = (props: Props) => {
  const [page, setPage] = useState(1)
  const { data, isLoading, mutate } = useGetMatterPage(page, props.condition)

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
            </>
          )
        },
      },
    ]
    return columns
  }, [])

  // 複数削除関連
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  // どこを今選択しているか
  const onChangeSelects = (rows: string[]) => {
    let newSelectedRows = [...selectedRows]
    rows.forEach((row) => {
      // すでに行が含まれていれば（選択されていれば）選択を解除する
      newSelectedRows = selectedRows.includes(row)
        ? newSelectedRows.filter((r) => r !== row)
        : [...newSelectedRows, row]
    })
    setSelectedRows(newSelectedRows)
  }

  const { execute: executeRemove } = useRemoveMatter()
  // const onRemove = (matterId: string) => {
  //   executeRemove(matterId).then((_) => {
  //     // 削除後に獣害情報一覧を再取得する
  //     mutate()
  //     toast.success('獣害情報を削除しました。')
  //     props.onRemove && props.onRemove(matterId)
  //   })
  // }
  const onSelectedRemove = (newSelectedRows: string[]) => {
    // 選択された行のidを取り出し順番に削除する処理
    newSelectedRows.forEach((rowId) => {
      executeRemove(rowId).then((_) => {
        props.onRemove && props.onRemove(rowId)
      })
    })
    // 削除後に獣害情報一覧を再取得する
    mutate()
    toast.success('獣害情報を削除しました。')
  }

  const onRemove = (selectedRows: string[]) => {
    onSelectedRemove(selectedRows);
  };

  return (
    <>
      <div className='mb-2'>
        <Row>
          <Col>
            {/* <Button
                size='sm'
                variant='danger'
                className='mx-1'
                onClick={() => onRemove(matterId)}
              >
                削除
              </Button> */}
            <Button
              size='sm'
              variant='danger'
              disabled={selectedRows ? selectedRows.length === 0 : true}
              onClick={()=>onRemove(selectedRows)}
            >
              選択を削除
            </Button>
          </Col>
        </Row>
      </div>
      <PaginationTable
        isLoading={isLoading}
        smallTable
        columns={columns}
        pagination={data}
        onPageChange={(page) => setPage(page)}
        selectMode
        // どの行が選択されているか
        onChangeSelects={onChangeSelects}
        selectedRows={selectedRows}
      ></PaginationTable>
    </>
  )
}

export default MatterTable
