import { ReactElement } from 'react'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

/**
 * なにもないレイアウト
 */
const NoneLayout = ({ children }: LayoutProps) => <>{children}</>

export default NoneLayout
