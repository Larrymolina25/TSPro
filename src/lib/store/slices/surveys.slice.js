export const createSurveysSlice = (set, get) => ({
  surveysByCompany: [],

  setSurveysByCompany: (companyId, surveys) => {
    const companyExists = get().companies.some((c) => c.companyId === companyId)
    if (!companyExists) return console.warn(`Company ${companyId} does not exist.`)

    const filtered = get().surveysByCompany.filter((c) => c.companyId !== companyId)
    set({ surveysByCompany: [...filtered, { companyId, surveys }] })
  },

  addSurveyToCompany: (companyId, survey) => {
    const state = get()

    const companyExists = state.companies.some((c) => c.companyId === companyId)
    if (!companyExists) {
      console.warn(`Company ${companyId} does not exist. Cannot add survey.`)
      return
    }

    const list = state.surveysByCompany
    const company = list.find((c) => c.companyId === companyId)

    if (!company) {
      set({
        surveysByCompany: [...list, { companyId, surveys: [survey] }],
      })
      return
    }

    company.surveys.push(survey)
    set({ surveysByCompany: [...list] })
  },
})
