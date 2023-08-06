import { Button } from 'react-bootstrap'

interface Props {
  confirmText: string
  confirmColor?: string
  cancelText?: string
  disabled?: boolean
  onConfirm?: () => void
  onCancel?: () => void
}

/**
 * 確認とキャンセルが含まれるボタン
 * 主にダイアログで使用する
 */
const ConfirmAndCancel = (props: Props) => {
  return (
    <>
      <Button
        className='me-2'
        color='secondary'
        variant='ghost'
        onClick={props.onCancel}
      >
        {props.cancelText ?? 'キャンセル'}
      </Button>
      <Button
        variant={props.confirmColor}
        disabled={props.disabled}
        onClick={props.onConfirm}
      >
        {props.confirmText}
      </Button>
    </>
  )
}

export default ConfirmAndCancel
