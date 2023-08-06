import { ReactElement } from 'react'
import { Navbar, Container } from 'react-bootstrap'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

/**
 * メニュー付きレイアウト
 */
const MenuLayout = ({ children }: LayoutProps) => (
  <>
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>小野地区獣害マップ</Navbar.Brand>
      </Container>
    </Navbar>
    <Container className='my-2'>{children}</Container>
  </>
)

export default MenuLayout
