import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// import { createAuthSlice } from './slices/auth.slice'
import { createUsersSlice } from './slices/users.slice'
import { createSurveysSlice } from './slices/surveys.slice'
import { createCompaniesSlice } from './slices/companies.slice'

export const useAppStore = create(
  persist(
    (set, get) => ({
      //   ...createAuthSlice(set, get),
      ...createUsersSlice(set, get),
      ...createCompaniesSlice(set, get),
      ...createSurveysSlice(set, get),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        // loggedUser: state.loggedUser,
        usersByCompany: state.usersByCompany,
        companies: state.companies,
        surveysByCompany: state.surveysByCompany,
      }),
    }
  )
)
