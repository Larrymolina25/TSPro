import { Table, Tag, Dropdown, Button } from 'antd'
import { MoreVertical } from 'lucide-react'

const SurveysTable = ({ surveys, onEdit, onExcel, onPdf, canCreateOrEditSurveys }) => {
  const menuItems = [
    { key: 'excel', label: 'Generar Excel' },
    { key: 'pdf', label: 'Generar PDF' },
    { key: 'editar', label: 'Editar encuesta', disabled: !canCreateOrEditSurveys },
  ]

  const handleMenuClick = (key, record) => {
    if (key === 'editar') return onEdit && onEdit(record)
    if (key === 'excel') return onExcel && onExcel(record)
    if (key === 'pdf') return onPdf && onPdf(record)
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

  return (
    <Table
      columns={columns}
      dataSource={surveys[0]?.surveys}
      rowKey='id'
      scroll={{ x: 800 }}
    />
  )
}

export default SurveysTable
