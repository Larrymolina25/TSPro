import { useState } from 'react'
import { useAppStore } from '../lib/store/zustandStore'
import { v4 as uuid } from 'uuid'

import { Button } from 'antd'
import { Plus } from 'lucide-react'

import { ModalUsers, UsersTable } from '../components'

const Users = () => {
  const userStore = useAppStore((state) => state.users)
  const addUsers = useAppStore((state) => state.addUser)
  const updateUser = useAppStore((state) => state.updateUser)
  const currentUser = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser'))
    : null

  const usersByCompany = userStore.filter((user) => user.idCompany === currentUser?.idCompany)

  const [modalOpen, setModalOpen] = useState(false)
  const [users, setUsers] = useState(usersByCompany ?? [])
  const [selectedUser, setSelectedUser] = useState(null)

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setModalOpen(true)
  }

  const handleCancel = () => {
    setModalOpen(false)
    setSelectedUser(null)
  }

  const handleSaveUser = (userData) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user?.id === selectedUser?.id
          ? { ...userData, id: uuid(), isAdmin: user?.isAdmin ?? false }
          : user
      )
    )

    setModalOpen(false)

    if (!selectedUser) {
      // Creacion de usuario
      const newUser = { ...userData, id: uuid(), idCompany: currentUser?.idCompany }
      addUsers(newUser)
      setUsers((prevUsers) => [...prevUsers, newUser])
      setModalOpen(false)
      return
    }

    // Actualizar usuario existente
    updateUser(selectedUser.id, userData)
    setSelectedUser(null)
  }

  const canCreateOrEditUser = currentUser?.isAdmin === true || currentUser?.cargo === 'usuarios'

  return (
    <div className='space-y-4 animate-fade-in'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-display font-bold text-foreground mb-2'>
            Usuarios / Empleados
          </h1>
          <p className='text-muted-foreground'>Gestiona los usuarios y empleados de tu empresa</p>
        </div>
        <Button
          disabled={!canCreateOrEditUser}
          onClick={() => setModalOpen(true)}
          className='gradient-primary shadow-elegant hover:opacity-90 transition-smooth gap-2 cursor-pointer'
        >
          <Plus className='w-5 h-5' />
          Crear Usuario
        </Button>
      </div>
      <article>
        <UsersTable
          users={users}
          canCreateOrEditUser={canCreateOrEditUser}
          handleEditUser={handleEditUser}
        />
      </article>
      {modalOpen && (
        <ModalUsers
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          currUser={selectedUser}
          handleSaveUser={handleSaveUser}
          handleCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default Users
