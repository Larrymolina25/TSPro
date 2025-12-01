import { useEffect, useState } from 'react'
import { Modal, Input, Select } from 'antd'

const ModalUsers = ({ currUser, modalOpen, handleSaveUser, handleCancel }) => {
  const [userData, setUserData] = useState({
    nombre: '',
    id: '',
    cargo: '',
    correo: '',
    password: '',
    active: true,
  })

  useEffect(() => {
    if (currUser) {
      setUserData({
        nombre: currUser.nombre || '',
        id: currUser.id || '',
        cargo: currUser.cargo || '',
        active: currUser.active || true,
        correo: currUser.correo || '',
        password: currUser.password || '',
      })
    }
  }, [currUser])

  return (
    <Modal
      title={currUser?.id ? 'Editar Usuario' : 'Crear Usuario'}
      open={modalOpen}
      onCancel={handleCancel}
      onOk={() => handleSaveUser(userData)}
      okText='Guardar cambios'
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {currUser?.isAdmin && <p>Usuario Administrador</p>}

        <div>
          <label>Nombre completo</label>
          <Input
            value={userData.nombre}
            onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
          />
        </div>

        <div>
          <label>Correo</label>
          <Input
            type={'email'}
            disabled={currUser?.isAdmin}
            value={userData.correo}
            onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
          />
        </div>

        <div>
          <label>Contraseña</label>
          <Input
            type={'password'}
            value={userData.password}
            disabled={!!currUser}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
        </div>
        <div>
          <label>Cargo</label>
          <Select
            style={{ width: '100%' }}
            value={userData.cargo}
            disabled={currUser?.isAdmin}
            onChange={(value) => setUserData({ ...userData, cargo: value })}
            options={[
              { value: 'encuestas', label: 'Creador encuestas' },
              { value: 'usuarios', label: 'Creador usuarios' },
            ]}
          />
        </div>

        <div>
          <label>Activo</label>
          <Select
            style={{ width: '100%' }}
            value={userData.active}
            disabled={currUser?.isAdmin}
            onChange={(value) => setUserData({ ...userData, active: value })}
            options={[
              { value: true, label: 'Activo' },
              { value: false, label: 'Inactivo' },
            ]}
          />
        </div>
      </div>
    </Modal>
  )
}

export default ModalUsers

// export default function UsersTableWithModal() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Estado local para edición
//   const [userData, setUserData] = useState({
//     nombre: "",
//     id: "",
//     cargo: "",
//     activo: true,
//   });

//   // DATA DE EJEMPLO
//   const data = [
//     {
//       key: "1",
//       nombre: "Juan Pérez",
//       id: "1029384736",
//       cargo: "Administrador",
//       activo: true,
//     },
//     {
//       key: "2",
//       nombre: "María Gómez",
//       id: "8392017465",
//       cargo: "Auxiliar",
//       activo: false,
//     },
//   ];

//   // COLUMNAS
//   const columns = [
//     {
//       title: "Nombre completo",
//       dataIndex: "nombre",
//       width: 200,
//     },
//     {
//       title: "Identificación",
//       dataIndex: "id",
//       width: 150,
//     },
//     {
//       title: "Cargo",
//       dataIndex: "cargo",
//       width: 150,
//     },
//     {
//       title: "Activo",
//       dataIndex: "activo",
//       width: 120,
//       render: (value) =>
//         value ? <Tag color="green">Activo</Tag> : <Tag color="red">Inactivo</Tag>,
//     },
//     {
//       title: "",
//       width: 80,
//       fixed: "right",
//       align: "center",
//       render: (_, record) => (
//         <Button
//           type="text"
//           icon={<Pencil size={18} />}
//           onClick={() => handleOpenModal(record)}
//         />
//       ),
//     },
//   ];

//   // Abrir modal y cargar datos
//   const handleOpenModal = (record) => {
//     setUserData(record); // seteamos el usuario completo
//     setIsModalOpen(true);
//   };

//   // Guardar cambios
//   const handleSave = () => {
//     console.log("Usuario actualizado:", userData);

//     // Aquí haces:
//     // axios.put(...)
//     // actualizar Zustand
//     // dispatch(...)
//     // etc.

//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Table columns={columns} dataSource={data} scroll={{ x: 900 }} />

//     </>
//   );
// }
