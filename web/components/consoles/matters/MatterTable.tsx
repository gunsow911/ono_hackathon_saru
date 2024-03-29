import { ColumnDef } from '@tanstack/react-table'
import PaginationTable from 'components/atoms/PaginationTable'
import AlertDialog from 'components/molecules/AlertDialog'
import dayjs from 'dayjs'
import useGetMatterPage, {
  Condition,
} from 'hooks/console/matter/useGetMatterPage'
import useRemoveMultipleMatter from 'hooks/console/matter/useRemoveMultipleMatter'
import { Matter } from 'models/Matter'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

type Props = {
  condition?: Condition
  onRemove?: () => void
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
  const [visible, setVisible] = useState(false)

  const { execute: executeRemove } = useRemoveMultipleMatter()

  const onRemove = (selectedRows: string[]) => {
    executeRemove(selectedRows).then(() => {
      props.onRemove && props.onRemove()
      // 削除後に獣害情報一覧を再取得する
      mutate()
      setVisible(false)
      toast.success('獣害情報を削除しました。')
    })
  }

  return (
    <>
      <div className='mb-2'>
        <Row>
          <Col>
            <Button
              size='sm'
              variant='danger'
              onClick={() => setVisible(!visible)}
              disabled={selectedRows ? selectedRows.length === 0 : true}
            >
              選択を削除
            </Button>
            <AlertDialog
              show={visible}
              title='確認'
              confirmText='削除'
              confirmColor='danger'
              onConfirm={() => onRemove(selectedRows)}
              onCancel={() => setVisible(false)}
            >
              この獣害情報を削除します。操作はもとに戻せません。
            </AlertDialog>
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
        onChangeSelects={(rows) => setSelectedRows(rows)}
        selectedRows={selectedRows}
      ></PaginationTable>
    </>
  )
}

export default MatterTable
