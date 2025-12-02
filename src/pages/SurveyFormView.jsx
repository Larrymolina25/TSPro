// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { Button, Input, Radio, Form, message } from 'antd'
// import { FileSpreadsheet, FileText, Save, SkipBack, StepBack } from 'lucide-react'
// import { useAppStore } from '../lib/store/zustandStore'
// import toast from 'react-hot-toast'

// const SurveyFormView = () => {
//   const params = useParams()

//   const companyIdParam = params?.companyId ?? null
//   const surveyIdParam = params?.id ?? null

//   const encuestas = useAppStore((s) => s.surveysByCompany)
//   const [survey, setSurvey] = useState(null)

//   const [formValues, setFormValues] = useState({})

//   useEffect(() => {
//     if (!companyIdParam || !surveyIdParam) return

//     // Buscar el grupo de la empresa
//     const companyBlock = encuestas.find((c) => String(c.companyId) === String(companyIdParam))

//     if (!companyBlock) {
//       toast.error('No existe esa empresa.')
//       return
//     }

//     // Buscar la encuesta dentro de esa empresa
//     const foundSurvey = companyBlock.surveys.find((s) => String(s.id) === String(surveyIdParam))

//     if (!foundSurvey) {
//       toast.error('No existe esa encuesta.')
//       return
//     }

//     setSurvey(foundSurvey)

//     // Inicializar valores del form
//     const initialValues = {}
//     foundSurvey.campos.forEach((f) => {
//       initialValues[f.id] = ''
//     })
//     setFormValues(initialValues)
//   }, [companyIdParam, surveyIdParam, encuestas])

//   if (!survey) return <p>Cargando encuesta...</p>

//   const handleChange = (id, value) => {
//     setFormValues((prev) => ({
//       ...prev,
//       [id]: value,
//     }))
//   }

// const handleBack = () => {
//   window.history.back()
// }

//   const handleSave = () => {
//     console.log('Valores guardados:', formValues)
//     toast.success('Respuestas guardadas correctamente.')
//     // En una variable externa se podria guardar las respuestas
//     //  con las siguientes llaves:
//     //  companyIdParam, surveyIdParam, formValues
//     // y dentro de formValues estan las respuestas por campo, que seria un objeto con [idCampo]: valorRespuesta
//   }
//   // -- nice message message.success('Respuestas guardadas')

//   const handleExportExcel = () => {
//     console.log('Exportar EXCEL:', formValues)
//     toast.success('Generando Excel...')
//   }

//   const handleExportPDF = () => {
//     console.log('Exportar PDF:', formValues)
//     toast.success('Generando PDF...')
//   }

//   return (
//     <div className='space-y-6 max-w-2xl mx-auto py-8'>
//       <h1 className='text-3xl font-bold'>{survey.titulo}</h1>
//       <p className='text-gray-500'>Tipo: {survey.tipo.toUpperCase()}</p>

//       <Form layout='vertical'>
//         {survey.campos.map((campo) => (
//           <Form.Item
//             key={campo.id}
//             label={campo.label}
//             required={campo.required}
//           >
//             {/* tipo si_no */}
//             {survey.tipo === 'si_no' ? (
//               <Radio.Group
//                 value={formValues[campo.id]}
//                 onChange={(e) => handleChange(campo.id, e.target.value)}
//               >
//                 <Radio value='si'>Sí</Radio>
//                 <Radio value='no'>No</Radio>
//               </Radio.Group>
//             ) : (
//               // tipo preguntas abiertas
//               <Input
//                 value={formValues[campo.id]}
//                 onChange={(e) => handleChange(campo.id, e.target.value)}
//                 placeholder='Digite su respuesta'
//               />
//             )}
//           </Form.Item>
//         ))}
//       </Form>

//       {/* BOTONES */}
//       <div className='flex gap-3 mt-4'>
//         <Button
//           onClick={handleBack}
//           className='flex items-center gap-2'
//         >
//           <StepBack size={18} />
//           Volver
//         </Button>
//         <Button
//           onClick={handleExportExcel}
//           className='flex items-center gap-2'
//         >
//           <FileSpreadsheet size={18} />
//           Excel
//         </Button>

//         <Button
//           onClick={handleExportPDF}
//           className='flex items-center gap-2'
//         >
//           <FileText size={18} />
//           PDF
//         </Button>

//         <Button
//           type='primary'
//           onClick={handleSave}
//           className='flex items-center gap-2'
//         >
//           <Save size={18} />
//           Guardar
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default SurveyFormView

import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Input, Radio } from 'antd'
import toast from 'react-hot-toast'
import { useAppStore } from '../lib/store/zustandStore'
import { FileSpreadsheet, FileText, Save, StepBack } from 'lucide-react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const SurveyFormView = () => {
  const { companyId, id } = useParams()
  const navigate = useNavigate()

  // const allSurveys = useAppStore((state) => state.surveys)
  const allSurveys = useAppStore((s) => s.surveysByCompany)

  const [survey, setSurvey] = useState(null)
  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    if (!companyId || !id) return

    // Buscar el grupo de la empresa
    const companyBlock = allSurveys.find((c) => String(c.companyId) === String(companyId))

    if (!companyBlock) {
      toast.error('No existe esa empresa.')
      return
    }

    // Buscar la encuesta dentro de esa empresa
    const foundSurvey = companyBlock.surveys.find((s) => String(s.id) === String(id))

    if (!foundSurvey) {
      toast.error('No existe esa encuesta.')
      return
    }

    setSurvey(foundSurvey)

    // Inicializar valores del form
    const initialValues = {}
    foundSurvey.campos.forEach((f) => {
      initialValues[f.id] = ''
    })
    setFormValues(initialValues)
  }, [companyId, id, allSurveys])

  if (!survey)
    return (
      <div className='text-center p-20 text-xl font-bold text-neutral-500'>
        Cargando encuesta...
      </div>
    )

  const handleInputChange = (campoId, value) => {
    setFormValues((prev) => ({
      ...prev,
      [campoId]: value,
    }))
  }

  const handleBack = () => navigate('/dashboard/surveys')

  const handleSave = () => {
    const camposRequeridos = survey.campos.filter((c) => c.required)
    const noLlenos = camposRequeridos.filter(
      (c) => !formValues[c.id] || formValues[c.id].trim() === ''
    )

    if (noLlenos.length > 0) {
      toast.error('Faltan preguntas obligatorias por responder.')
      return
    }

    const savedData = {
      companyId,
      surveyId: id,
      answers: formValues,
    }

    // GUARDAR REGISTRO EN ZUSTAND
    console.log('Respuestas guardadas:', savedData)

    toast.success('Respuestas guardadas correctamente.')
  }

  const handleGeneratePDF = () => {
    const printContent = document.getElementById('survey-form-view')

    if (!printContent) {
      toast.error('No se encontró el contenido para imprimir.')
      return
    }

    const original = document.body.innerHTML

    document.body.innerHTML = printContent.innerHTML
    window.print()
    document.body.innerHTML = original

    // window.location.reload()
  }

  const handleGenerateExcel = () => {
    // Crear datos para la hoja
    const rows = survey.campos.map((field) => ({
      Pregunta: field.label,
      Respuesta: formValues[field.id] || '',
    }))

    // Crear libro
    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Respuestas')

    // Crear archivo
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })

    const file = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    saveAs(file, `survey_${companyId}_${id}.xlsx`)
  }

  return (
    <div className='max-w-3xl mx-auto p-6 animate-fade-in'>
      <h1 className='text-3xl font-bold mb-1 text-foreground'>{survey.titulo}</h1>

      <p className='text-muted-foreground mb-6'>
        Tipo de encuesta:{' '}
        <span className='font-semibold'>
          {survey.tipo === 'si_no' ? 'Sí / No' : 'Preguntas abiertas'}
        </span>
      </p>

      {/* CONTENIDO A IMPRIMIR */}
      <div id='survey-form-view'>
        {survey.campos.map((campo) => (
          <div
            key={campo.id}
            className='mb-5'
          >
            <label className='font-semibold block mb-2'>
              {campo.label}
              {campo.required && <span className='text-red-500 ml-1'>*</span>}
            </label>

            {/* SI-NO */}
            {survey.tipo === 'si_no' && (
              <Radio.Group
                value={formValues[campo.id]}
                onChange={(e) => handleInputChange(campo.id, e.target.value)}
              >
                <Radio value='si'>Sí</Radio>
                <Radio value='no'>No</Radio>
              </Radio.Group>
            )}

            {/* ABIERTAS */}
            {survey.tipo === 'abiertas' && (
              <Input
                placeholder='Escribe tu respuesta'
                value={formValues[campo.id]}
                onChange={(e) => handleInputChange(campo.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className='flex gap-3 mt-4'>
        <Button
          onClick={handleBack}
          className='flex items-center gap-2'
        >
          <StepBack size={18} />
          Volver
        </Button>
        <Button
          onClick={handleGenerateExcel}
          className='flex items-center gap-2'
        >
          <FileSpreadsheet size={18} />
          Excel
        </Button>

        <Button
          onClick={handleGeneratePDF}
          className='flex items-center gap-2'
        >
          <FileText size={18} />
          PDF
        </Button>

        <Button
          type='primary'
          onClick={handleSave}
          className='flex items-center gap-2'
        >
          <Save size={18} />
          Guardar
        </Button>
      </div>
    </div>
  )
}

export default SurveyFormView
