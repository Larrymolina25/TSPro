export const createCompaniesSlice = (set) => ({
  companies: [],

  setCompanies: (companies) => set({ companies }),

  addCompany: (newCompany) =>
    set((state) => ({
      companies: [...state.companies, newCompany],
    })),
})
