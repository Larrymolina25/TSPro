import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AppSidebar } from '../layout'

const Dashboard = () => {
  const navigate = useNavigate()

  // TO-DO:
  // if (!localStorage.getItem('currentUser')) {
  //   navigate('/auth')
  // }

  useEffect(() => {
    // Redirect to users by default
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
      navigate('/dashboard/users')
    }
  }, [navigate])

  return (
    <div className='min-h-screen flex w-full bg-gradient-subtle'>
      <AppSidebar>
        <main className='flex-1 p-4 md:p-6'>
          <Outlet />
        </main>
      </AppSidebar>
    </div>
  )
}

export default Dashboard
