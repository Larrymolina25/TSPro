import { Outlet, useNavigate } from 'react-router-dom'
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/AppSidebar";
// import { Button } from "@/components/ui/button";
// import { LogOut, Menu } from 'lucide-react'
// import { toast } from "sonner";
import { useEffect } from 'react'
import { AppSidebar } from '../components'
import toast from 'react-hot-toast'
import { Button } from 'antd'

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to users by default
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
      navigate('/dashboard/users')
    }
  }, [navigate])

  const handleLogout = () => {
    toast.success('Sesión cerrada')
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  return (
    // <SidebarProvider>
    <div className='min-h-screen flex w-full bg-gradient-subtle'>
      <AppSidebar />
      <div className='flex-1 flex flex-col'>
        <header className='sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-sm px-4 md:px-6 shadow-soft'>
          {/* <SidebarTrigger className='hover:bg-muted transition-smooth'>
              <Menu className='w-5 h-5' />
            </SidebarTrigger> */}
          <Button
            type='primary'
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
          {/* <Button
              variant='outline'
              size='sm'
              onClick={handleLogout}
              className='gap-2 transition-smooth hover:bg-destructive hover:text-destructive-foreground'
            >
              <LogOut className='w-4 h-4' />
              <span className='hidden sm:inline'>Cerrar Sesión</span>
            </Button> */}
        </header>
        <main className='flex-1 p-4 md:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
{
  /* </SidebarProvider> */
}

export default Dashboard
