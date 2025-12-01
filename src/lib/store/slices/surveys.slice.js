export const createSurveysSlice = (set, get) => ({
  surveysByCompany: [],

  // Guarda toda la lista de una empresa
  setSurveysByCompany: (companyId, surveys) => {
    const state = get()
    const companyExists = state.companies.some((c) => c.companyId === companyId)
    if (!companyExists) return console.warn(`Company ${companyId} does not exist.`)

    const cleaned = state.surveysByCompany.filter((c) => c.companyId !== companyId)

    set({
      surveysByCompany: [...cleaned, { companyId, surveys }],
    })
  },

  // Agregar
  addSurveyToCompany: (companyId, survey) => {
    const state = get()

    const companyExists = state.companies.some((c) => c.id === companyId)
    if (!companyExists) {
      console.warn(`Company ${companyId} does not exist.`)
      return
    }

    const entry = state.surveysByCompany.find((c) => c.companyId === companyId)

    if (!entry) {
      set({
        surveysByCompany: [...state.surveysByCompany, { companyId, surveys: [survey] }],
      })
      return
    }

    set({
      surveysByCompany: state.surveysByCompany.map((c) =>
        c.companyId === companyId ? { ...c, surveys: [...c.surveys, survey] } : c
      ),
    })
  },

  clearSurveys: () => {
    set({ surveysByCompany: [] })
  },

  // Editar
  updateSurveyInCompany: (companyId, updatedSurvey) => {
    const state = get()

    set({
      surveysByCompany: state.surveysByCompany.map((c) =>
        c.companyId === companyId
          ? {
              ...c,
              surveys: c.surveys.map((s) => (s.id === updatedSurvey.id ? updatedSurvey : s)),
            }
          : c
      ),
    })
  },
})
