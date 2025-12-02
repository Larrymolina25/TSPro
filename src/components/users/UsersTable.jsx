import { Table, Tag, Button } from 'antd'
import { Download, Pencil } from 'lucide-react'

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const UsersTable = ({ canCreateOrEditUser = false, users = [], handleEditUser = () => {} }) => {
  const columns = [
    {
      title: 'Nombre completo',
      dataIndex: 'nombre',
      key: 'nombre',
      width: 200,
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
      width: 160,
    },
    {
      title: 'Cargo',
      dataIndex: 'cargo',
      key: 'cargo',
      width: 150,
      render: (value, item) => {
        const cargo = item?.isAdmin ? 'Administrador' : value
        return <span className='capitalize'>{cargo}</span>
      },
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      key: 'active',
      width: 120,
      render: (value) =>
        value ? <Tag color='green'>Activo</Tag> : <Tag color='red'>Inactivo</Tag>,
    },
    {
      title: '',
      key: 'acciones',
      width: 80,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Button
          disabled={!canCreateOrEditUser}
          onClick={() => handleEditUser(record)}
          icon={<Pencil size={18} />}
        />
      ),
    },
  ]

  const exportToExcel = () => {
    // 1. Convertir columnas de Antd a headers
    const headers = columns.map((col) => col.title)

    // 2. Convertir dataSource a rows reales
    const rows = users.map((item) => columns.map((col) => item[col.dataIndex]))

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

    saveAs(blobData, `tabla_exportada_users.xlsx`)
  }

  return (
    <>
      <Button
        onClick={exportToExcel}
        className='mb-4 gradient-primary shadow-elegant hover:opacity-90 transition-smooth gap-2 cursor-pointer'
      >
        Exportar a excel
        <Download className='w-5 h-5' />
      </Button>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={users}
        scroll={{ x: 900 }}
      />
    </>
  )
}
export default UsersTable
