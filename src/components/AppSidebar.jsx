import { Users, FileText, Building2 } from 'lucide-react'
import { NavLink } from '@/components/NavLink'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

const menuItems = [
  {
    title: 'Usuarios',
    url: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Encuestas',
    url: '/dashboard/surveys',
    icon: FileText,
  },
]

const AppSidebar = () => {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Sidebar
      collapsible='icon'
      className='border-r-0'
    >
      <SidebarContent className='bg-sidebar'>
        <div className={`flex items-center gap-3 px-4 py-6 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className='w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-elegant'>
            <Building2 className='w-5 h-5 text-white' />
          </div>
          {!isCollapsed && (
            <div className='flex flex-col'>
              <span className='font-display font-bold text-sidebar-foreground'>Mi Empresa</span>
              <span className='text-xs text-sidebar-foreground/60'>Dashboard</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      className='transition-smooth hover:bg-sidebar-accent'
                      activeClassName='bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-4 border-primary'
                    >
                      <item.icon className='w-5 h-5' />
                      <span>{item?.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
