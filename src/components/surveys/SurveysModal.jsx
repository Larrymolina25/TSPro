import { useState, useEffect } from 'react'
import { Modal, Input, Select, Button } from 'antd'
import { Plus, Trash2 } from 'lucide-react'

const SurveyModal = ({ idCompany, open, onClose, initialData = null, onSubmit }) => {
  const isEditing = Boolean(initialData)

  const [surveyType, setSurveyType] = useState('si_no')
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('Activa')
  const [fields, setFields] = useState([])

  // Cargar datos cuando es edición
  useEffect(() => {
    if (initialData) {
      setSurveyType(initialData.tipo)
      setTitle(initialData.titulo)
      setStatus(initialData.estado)
      setFields(initialData.campos || [])
    } else {
      setTitle('')
      setStatus('Activa')
      setFields([])
      setSurveyType('si_no')
    }
  }, [initialData])

  const addField = () => {
    const newField = {
      id: Date.now(),
      label: '',
      type: surveyType === 'abiertas' ? 'string' : undefined,
      required: surveyType === 'si_no',
    }

    setFields([...fields, newField])
  }

  const updateField = (id, key, value) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)))
  }

  const removeField = (id) => {
    setFields(fields.filter((f) => f.id !== id))
  }

  const handleSave = () => {
    const payload = {
      idCompany,
      tipo: surveyType,
      titulo: title,
      estado: status,
      campos: fields,
      fecha: new Date().toISOString(),
    }

    onSubmit(payload)
    onClose()
  }

  return (
    <Modal
      title={isEditing ? 'Editar Encuesta' : 'Crear Encuesta'}
      open={open}
      onCancel={onClose}
      width={750}
      footer={null}
    >
      <p style={{ color: '#666' }}>
        {isEditing ? 'Modifica los datos de la encuesta' : 'Crea una nueva encuesta'}
      </p>
      <label style={styles.label}>Tipo de Encuesta</label>
      <Select
        value={surveyType}
        onChange={setSurveyType}
        style={{ width: '100%', marginBottom: 20 }}
        options={[
          { value: 'si_no', label: 'Sí / No' },
          { value: 'abiertas', label: 'Preguntas abiertas' },
        ]}
      />
      <label style={styles.label}>Título de la Encuesta</label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <label style={styles.label}>Estado</label>
      <Select
        value={status}
        onChange={setStatus}
        style={{ width: '100%', marginBottom: 20 }}
        options={[
          { value: 'Activa', label: 'Activa' },
          { value: 'Finalizada', label: 'Finalizada' },
        ]}
      />
      <div style={styles.fieldsHeader}>
        <label style={styles.label}>Campos</label>
        <Button
          icon={<Plus size={16} />}
          onClick={addField}
        >
          Agregar Campo
        </Button>
      </div>
      {fields.length === 0 ? (
        <div style={styles.emptyBox}>No hay campos agregados. Haz clic en “Agregar Campo”.</div>
      ) : (
        fields.map((field) => (
          <div
            key={field.id}
            style={styles.fieldRow}
          >
            <Input
              placeholder='Etiqueta del campo'
              value={field.label}
              onChange={(e) => updateField(field.id, 'label', e.target.value)}
              style={{ flex: 1, marginRight: 10 }}
            />
            {surveyType !== 'si_no' && (
              <Input
                value='string'
                disabled
                style={{ width: 100, marginRight: 10 }}
              />
            )}
            {surveyType === 'si_no' && (
              <Input
                value='Requerido'
                disabled
                style={{ width: 120, marginRight: 10 }}
              />
            )}
            <Button
              danger
              icon={<Trash2 size={16} />}
              onClick={() => removeField(field.id)}
            />
          </div>
        ))
      )}
      <div style={styles.footer}>
        <Button
          onClick={onClose}
          style={{ marginRight: 10 }}
        >
          Cancelar
        </Button>
        <Button
          type='primary'
          onClick={handleSave}
        >
          {isEditing ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </Modal>
  )
}

const styles = {
  label: { fontWeight: 600, marginBottom: 6, display: 'block' },
  emptyBox: {
    border: '1px dashed #d9d9d9',
    padding: 24,
    borderRadius: 8,
    textAlign: 'center',
    color: '#999',
  },
  fieldsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fieldRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  footer: {
    marginTop: 30,
    textAlign: 'right',
  },
}

export default SurveyModal
