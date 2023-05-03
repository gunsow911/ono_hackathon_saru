import { ReactElement } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

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
        <Navbar.Brand>小野地区獣害マッピング</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/'>獣害マップ</Nav.Link>
            <Nav.Link href='/users/3752b6b1-ae04-4076-8907-49fce7b945eb/report'>
              獣害報告(テストユーザ)
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {children}
  </>
)

export default MenuLayout
