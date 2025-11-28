export const createCompaniesSlice = (set) => ({
  companies: [],

  setCompanies: (companies) => set({ companies }),

  addCompany: (companyId, name) =>
    set((state) => ({
      companies: [...state.companies, { companyId, name }],
    })),
})
