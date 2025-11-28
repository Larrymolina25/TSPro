/*
    const users = [
        { id: 'user_1', correo: 'dasdha1', password: 'asdasd2', idCompany: 'company_1',active: true },
        { id: 'user_2', correo: 'dasdha2', password: 'asdasd2', idCompany: 'company_2',active: true },
        { id: 'user_3', correo: 'dasdha2', password: 'asdasd2', idCompany: 'company_1',active: false },
      ]
    */

export const createUsersSlice = (set, get) => ({
  users: [],

  setUsers: (users) => set({ users }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  updateUser: (userId, data) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === userId ? { ...u, ...data } : u)),
    })),

  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId),
    })),

  getUsersByCompany: (companyId) => {
    return get().users.filter((u) => u.idCompany === companyId)
  },
})
