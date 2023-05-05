import { Modal } from 'react-bootstrap'
import { ReactNode } from 'react'
import ConfirmAndCancel from './ConfirmAndCancel'

interface Props {
  show: boolean
  // size?: 'sm' | 'lg' | 'xl'
  title?: string
  loading?: boolean
  children?: ReactNode
  confirmText?: string
  confirmColor?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

/**
 * このダイアログはユーザの操作を強制的にフォーカスします。
 * フォームなどの入力目的には利用せず、
 * 削除確認など、不可逆的な操作を行う際の確認として利用してください。
 */
const AlertDialog = (props: Props) => {
  return (
    <>
      <Modal
        centered
        backdrop='static'
        show={props.show}
        // size={props.size}
        // dialogClassName='niokuru-dialog'
        // contentClassName='niokuru-dialog-content'
      >
        <Modal.Header
          closeButton
          closeLabel='閉じる'
          closeVariant='white'
          onHide={props.onCancel}
          className='py-2'
        >
          <div className='h3 my-auto'>
            {props.title ? props.title : ''}
          </div>
        </Modal.Header>
        <Modal.Body className='py-2 px-4'>{props.children}</Modal.Body>
        <Modal.Footer className='pt-0 pb-2' style={{ borderTopWidth: 0 }}>
          <ConfirmAndCancel
            confirmText={props.confirmText ? props.confirmText : 'OK'}
            confirmColor={props.confirmColor ? props.confirmColor : 'primary'}
            cancelText={props.cancelText ? props.cancelText : 'キャンセル'}
            onConfirm={props.onConfirm}
            onCancel={props.onCancel}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AlertDialog
