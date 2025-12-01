import { Table, Tag, Button } from 'antd'
import { Pencil } from 'lucide-react'

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

  return (
    <Table
      rowKey='id'
      columns={columns}
      dataSource={users}
      scroll={{ x: 900 }}
    />
  )
}
export default UsersTable
