import { useEffect, useState } from 'react'
import { Layout, Menu, Button } from 'antd'
import { ChevronLeft, ChevronRight, Users, FileText, LogOut, Home } from 'lucide-react'
import { useAppStore } from '../lib/store/zustandStore'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const { Sider, Header, Content } = Layout

const menuItems = [
  {
    key: 1,
    label: 'Usuarios',
    url: '/dashboard/users',
    icon: <Users size={18} />,
  },
  {
    key: 2,
    label: 'Encuestas',
    url: '/dashboard/surveys',
    icon: <FileText size={18} />,
  },
]

const navigateTo = {
  1: '/dashboard/users',
  2: '/dashboard/surveys',
}

const AppSidebar = ({ children }) => {
  const companies = useAppStore((state) => state.companies)
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const navigate = useNavigate()

  // TRATAR DE ACOMODAR PARA QUE QUEDE POR DEFECTO
  const [collapsed, setCollapsed] = useState(false)
  const [menuSelected, setMenuSelected] = useState(1)

  const [nameCompany, setNameCompany] = useState('Mi Aplicación')

  const siderWidth = 200

  const handleLogout = () => {
    toast.success('Sesión cerrada')
    localStorage.removeItem('currentUser')
    navigate('/')
  }
  const handleMenuClick = (e) => {
    navigateTo[e.key] && navigate(navigateTo[e.key])
    setMenuSelected(e.key)
  }

  useEffect(() => {
    const currentCompany = companies.find((c) => c.id === currentUser.idCompany)
    if (currentCompany) {
      console.log('Current Company:', currentCompany)
      setNameCompany(currentCompany.nombre ?? currentCompany.nombreEmpresa ?? 'Mi Aplicación')
    }
  }, [companies, currentUser.idCompany])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        width={siderWidth}
        trigger={null}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
            gap: 8,
          }}
        >
          {/* TO-DO: Cuando se colapse, este texto desaparezca como el Menu */}
          <Home />
          {nameCompany}
        </div>

        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[menuSelected]}
          // defaultSelectedKeys={[menuSelected]}
          items={[...menuItems]}
          onClick={handleMenuClick}
        />

        <div className='w-full absolute bottom-0 p-4 border-t border-gray-700'>
          <p className='text-white'>
            Usuario: <br></br>
            {currentUser?.nombre ?? ''}
          </p>
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 0 : siderWidth,
          transition: 'margin-left 200ms ease',
        }}
      >
        <Header
          style={{
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button
              type='text'
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            />
          </div>

          <Button
            icon={<LogOut size={16} />}
            type='primary'
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </Header>

        <Content style={{ margin: 16, padding: 24, background: '#fff' }}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AppSidebar
