import useRequireAuth from 'hooks/adminUser/useRequireAuth'
import { ReactElement } from 'react'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

/**
 * 管理者画面なにもないレイアウト
 */
const ConsoleNoneLayout = ({ children }: LayoutProps) => {
  useRequireAuth('/console/login')
  return <div>{children}</div>
}

export default ConsoleNoneLayout
