import { Table, Tag, Dropdown, Button } from 'antd'
import { Download, MoreVertical } from 'lucide-react'

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const SurveysTable = ({ surveys, onEdit, onPreview, canCreateOrEditSurveys }) => {
  const menuItems = [
    { key: 'editar', label: 'Editar encuesta', disabled: !canCreateOrEditSurveys },
    { key: 'preview', label: 'Realizar encuesta' },
  ]

  const handleMenuClick = (key, record) => {
    if (key === 'editar') return onEdit && onEdit(record)
    if (key === 'preview') return onPreview && onPreview(record)
  }

  const columns = [
    { title: 'Título', dataIndex: 'titulo', key: 'titulo', width: 300 },
    { title: 'Fecha', dataIndex: 'fecha', key: 'fecha', width: 120 },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      width: 120,
      render: (s) =>
        s === 'activa' || s === 'Activa' ? (
          <Tag color='green'>Activa</Tag>
        ) : (
          <Tag color='red'>Inactiva</Tag>
        ),
    },
    {
      title: '',
      key: 'acciones',
      width: 80,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: menuItems,
            onClick: ({ key }) => handleMenuClick(key, record),
          }}
          trigger={['click']}
        >
          <Button
            type='text'
            icon={<MoreVertical size={18} />}
          />
        </Dropdown>
      ),
    },
  ]

  const exportToExcel = () => {
    // 1. Convertir columnas de Antd a headers
    const headers = columns.map((col) => col.title)

    // 2. Convertir dataSource a rows reales
    const rows = surveys[0]?.surveys.map((item) => columns.map((col) => item[col.dataIndex]))

    // 3. Armar estructura final
    const worksheetData = [headers, ...rows]

    // 4. Crear hoja
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)

    // 5. Crear libro
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos')

    // 6. Guardar archivo
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })

    const blobData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    saveAs(blobData, `tabla_exportada_encuestas.xlsx`)
  }

  return (
    <div>
      <Button
        onClick={exportToExcel}
        className='mb-4 gradient-primary shadow-elegant hover:opacity-90 transition-smooth gap-2 cursor-pointer'
      >
        Exportar a excel
        <Download className='w-5 h-5' />
      </Button>

      <Table
        columns={columns}
        dataSource={surveys[0]?.surveys}
        rowKey='id'
        scroll={{ x: 800 }}
      />
    </div>
  )
}

export default SurveysTable
