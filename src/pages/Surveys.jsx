import { useMemo, useState } from 'react'
import { useAppStore } from '../lib/store/zustandStore'

import { Button } from 'antd'
import { Plus } from 'lucide-react'

import { SurveyModal, SurveysTable } from '../components'
import { useNavigate } from 'react-router-dom'

const Surveys = () => {
  const allSurveys = useAppStore((s) => s.surveysByCompany)
  const addSurveyToCompany = useAppStore((s) => s.addSurveyToCompany)
  const updateSurveyInCompany = useAppStore((s) => s.updateSurveyInCompany)

  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingSurvey, setEditingSurvey] = useState(null)

  // Obtener idCompany del usuario en localStorage (soporto 'login' o 'currentUser')
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || 'null')
    } catch {
      return null
    }
  })()
  const idCompany = storedUser?.idCompany ?? storedUser?.companyId ?? null

  // Filtrar encuestas de la compañia actual
  const companySurveys = useMemo(() => {
    if (!idCompany) return []
    return allSurveys?.filter((s) => String(s.companyId) === String(idCompany))
  }, [allSurveys, idCompany])

  const openCreate = () => {
    setEditingSurvey(null)
    setModalOpen(true)
  }

  const openEdit = (survey) => {
    setEditingSurvey(survey)
    setModalOpen(true)
  }

  const handleSubmit = (payload) => {
    if (editingSurvey) {
      // mantener idCompany y id de la encuesta (no cambiar)
      updateSurveyInCompany(idCompany, { ...payload, id: editingSurvey.id })
    } else {
      // asegurar company en la encuesta nueva
      addSurveyToCompany(idCompany, {
        ...payload,
        id:
          payload.id ??
          (typeof crypto !== 'undefined' ? crypto.randomUUID() : Date.now().toString()),
      })
    }
  }

  const handlePreview = (survey) => navigate(`/dashboard/preview/${idCompany}/${survey?.id}`)

  const canCreateOrEditSurveys = storedUser?.isAdmin === true || storedUser?.cargo === 'encuestas'

  return (
    <div className='space-y-4 animate-fade-in'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3'>
        <div>
          <h1 className='text-3xl font-display font-bold text-foreground mb-2'>Encuestas</h1>
          <p className='text-muted-foreground'>Gestiona las encuestas de tu compañia</p>
        </div>
        <Button
          disabled={!canCreateOrEditSurveys}
          onClick={openCreate}
          className='gradient-primary shadow-elegant hover:opacity-90 transition-smooth gap-2 cursor-pointer'
        >
          <Plus className='w-5 h-5' />
          Crear Encuesta
        </Button>
      </div>

      <SurveysTable
        surveys={companySurveys || []}
        onEdit={openEdit}
        onPreview={handlePreview}
        canCreateOrEditSurveys={canCreateOrEditSurveys}
      />

      {modalOpen && (
        <SurveyModal
          idCompany={idCompany}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={editingSurvey}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default Surveys
