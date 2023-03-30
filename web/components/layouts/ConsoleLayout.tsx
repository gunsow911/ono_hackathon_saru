import useRequireAuth from 'hooks/adminUser/useRequireAuth'
import useLogout from 'hooks/console/useLogout'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

/**
 * 管理者コンソールレイアウト
 */
const ConsoleLayout = ({ children }: LayoutProps) => {
  useRequireAuth('/console/login')
  const router = useRouter()
  const { execute: logout } = useLogout()

  const onClickLogout = () => {
    logout().then(() => {
      router.push('/console/login')
    })
  }

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand>小野地区獣害マッピング 管理者コンソール</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/console/matters'>獣害一覧</Nav.Link>
              <Nav.Link href='/console/users'>ユーザ一覧</Nav.Link>
              <Nav.Link onClick={onClickLogout}>ログアウト</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  )
}

export default ConsoleLayout
