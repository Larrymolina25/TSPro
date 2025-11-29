import { useEffect, useState } from 'react'

import { Building2, Mail, Lock, User, Hash, Users } from 'lucide-react'
import { v4 as uuid } from 'uuid'

import { useAppStore } from '../lib/store/zustandStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Auth = () => {
  const navigate = useNavigate()
  const users = useAppStore((state) => state.users)
  const addCompany = useAppStore((state) => state.addCompany)
  const addUser = useAppStore((state) => state.addUser)

  const currentUser = localStorage.getItem('currentUser')

  // TAB ACTIVO (usuarios o empresas)
  const [activeTab, setActiveTab] = useState('usuarios')

  // ESTADO para el formulario de usuarios
  const [usuariosData, setUsuariosData] = useState({
    correo: '',
    password: '',
  })

  // ESTADO para el formulario de empresas
  const [empresasData, setEmpresasData] = useState({
    nombreEmpresa: '',
    correo: '',
    password: '',
    identificacion: '',
    admin: '',
  })

  // VALIDACIÓN del login de Usuarios
  const handleLoginUsuarios = () => {
    if (!usuariosData.correo || !usuariosData.password) {
      toast.error('Por favor completa todos los campos')
      return
    }

    const currentUser = users?.find(
      (user) => user?.correo === usuariosData?.correo && user?.password === usuariosData?.password
    )

    if (!currentUser || !currentUser?.active) {
      toast.error('Usuario o contraseña incorrectos, o usuario inactivo')
      return
    }

    toast.success('Login de Usuario exitoso')
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    navigate('/dashboard')
  }

  // VALIDACIÓN del login de Empresas
  const handleLoginEmpresas = async () => {
    if (
      !empresasData.correo ||
      !empresasData.password ||
      !empresasData.nombreEmpresa ||
      !empresasData.identificacion ||
      !empresasData.admin
    ) {
      toast.error('Por favor completa todos los campos')
      return
    }

    await addCompany({ id: empresasData.identificacion, nombre: empresasData.nombreEmpresa })
    const currentUser = {
      id: uuid(),
      correo: empresasData.correo,
      nombre: empresasData.admin,
      password: empresasData.password,
      idCompany: empresasData.identificacion,
      active: true,
      isAdmin: true,
    }
    // tipos de roles: admin, usuarios, encuestas
    await addUser(currentUser)

    toast.success('Empresa creada exitosamente')
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    navigate('/dashboard')
  }

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard')
    }
  }, [currentUser])

  return (
    // CONTENEDOR PRINCIPAL (pantalla completa)
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      {/* Contenedor del card */}
      <div className='w-full max-w-lg'>
        {/* ENCABEZADO */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-3xl mb-4 shadow-2xl'>
            <Building2 className='w-10 h-10 text-white' />
          </div>

          <h1 className='text-4xl font-bold text-white mb-2'>Portal de Acceso TSPro</h1>

          <p className='text-purple-200'>Ingresa a tu cuenta según tu tipo de usuario</p>
        </div>

        {/* TARJETA (card) */}
        <div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden'>
          {/* BOTONES DE TABS */}
          <div className='flex p-2 bg-black/20'>
            {/* TAB: Usuarios */}
            <button
              onClick={() => setActiveTab('usuarios')}
              className={`flex-1 px-6 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                activeTab === 'usuarios'
                  ? 'bg-white text-purple-900 shadow-lg transform scale-105'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className='w-5 h-5 inline-block mr-2' />
              Ingresar como usuario
            </button>

            {/* TAB: Empresas */}
            <button
              onClick={() => setActiveTab('empresas')}
              className={`flex-1 px-6 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                activeTab === 'empresas'
                  ? 'bg-white text-purple-900 shadow-lg transform scale-105'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className='w-5 h-5 inline-block mr-2' />
              Ingresar como empresa
            </button>
          </div>

          {/* CONTENIDO DE LAS TABS */}
          <div className='p-8'>
            {/* --------------------------- */}
            {/* TAB 1: FORMULARIO USUARIOS */}
            {/* --------------------------- */}
            {activeTab === 'usuarios' && (
              <div className='space-y-5 animate-fadeIn'>
                {/* Título */}
                <div className='text-center mb-6'>
                  <h2 className='text-2xl font-bold text-white mb-1'>Acceso de Usuarios</h2>
                  <p className='text-purple-200 text-sm'>Completa tus datos para ingresar</p>
                </div>

                {/* Campo: Correo */}
                <div className='space-y-2'>
                  <label
                    htmlFor='correo-usuario'
                    className='block text-sm font-medium text-white'
                  >
                    Correo
                  </label>
                  <div className='relative'>
                    <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300' />
                    <input
                      id='correo-usuario'
                      type='email'
                      placeholder='usuario@empresa.com'
                      value={usuariosData.correo}
                      onChange={(e) =>
                        setUsuariosData({
                          ...usuariosData,
                          correo: e.target.value,
                        })
                      }
                      className='w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white'
                    />
                  </div>
                </div>

                {/* Campo: Contraseña */}
                <div className='space-y-2'>
                  <label
                    htmlFor='password-usuario'
                    className='block text-sm font-medium text-white'
                  >
                    Contraseña
                  </label>
                  <div className='relative'>
                    <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300' />
                    <input
                      id='password-usuario'
                      type='password'
                      placeholder='••••••••'
                      value={usuariosData.password}
                      onChange={(e) =>
                        setUsuariosData({
                          ...usuariosData,
                          password: e.target.value,
                        })
                      }
                      className='w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white'
                    />
                  </div>
                </div>

                {/* BOTÓN enviar */}
                <button
                  onClick={handleLoginUsuarios}
                  className='w-full bg-linear-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg'
                >
                  Iniciar Sesión
                </button>
              </div>
            )}

            {/* --------------------------- */}
            {/* TAB 2: FORMULARIO EMPRESAS */}
            {/* --------------------------- */}
            {activeTab === 'empresas' && (
              <div className='space-y-5 animate-fadeIn'>
                {/* Título */}
                <div className='text-center mb-6'>
                  <h2 className='text-2xl font-bold text-white mb-1'>Creacion de Empresas</h2>
                  <p className='text-purple-200 text-sm'>Ingresa las credenciales de tu empresa</p>
                </div>

                <div className='flex w-full gap-4'>
                  {/* Campo: Nombre Empresa */}
                  <div className='space-y-2'>
                    <label
                      htmlFor='nombre-empresa'
                      className='block text-sm font-medium text-white'
                    >
                      Nombre Empresa
                    </label>
                    <div className='relative'>
                      <User className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300' />
                      <input
                        id='nombre-empresa'
                        type='text'
                        placeholder='nombre de la empresa'
                        value={empresasData.nombreEmpresa}
                        onChange={(e) =>
                          setEmpresasData({
                            ...empresasData,
                            nombreEmpresa: e.target.value,
                          })
                        }
                        className='w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='id-empresa'
                      className='block text-sm font-medium text-white'
                    >
                      Identificacion Empresa
                    </label>
                    <div className='relative'>
                      <Hash className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300' />
                      <input
                        id='id-empresa'
                        type='text'
                        placeholder='nombre de la empresa'
                        value={empresasData.identificacion}
                        onChange={(e) =>
                          setEmpresasData({
                            ...empresasData,
                            identificacion: e.target.value,
                          })
                        }
                        className='w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white'
                      />
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='correo-empresa'
                    className='block text-sm font-medium text-white'
                  >
                    Correo
                  </label>
                  <div className='relative'>
                    <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300' />
                    <input
                      id='correo-empresa'
                      type='email'
                      placeholder='nombre@empresa.com'
                      value={empresasData.correo}
                      onChange={(e) =>
                        setEmpresasData({
                          ...empresasData,
                          correo: e.target.value,
                        })
                      }
                      className='w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white'
                    />
                  </div>
                </div>

                {/* Campo: Contraseña */}
                <div className='space-y-2'>
                  <label
                    htmlFor='password-empresa'
                    className='block text-sm font-medium text-white'
                  >
                    Contraseña
                  </label>
                  <div className='relative'>
                    <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300' />
                    <input
                      id='password-empresa'
                      type='password'
                      placeholder='••••••••'
                      value={empresasData.password}
                      onChange={(e) =>
                        setEmpresasData({
                          ...empresasData,
                          password: e.target.value,
                        })
                      }
                      className='w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='admin-empresa'
                    className='block text-sm font-medium text-white'
                  >
                    Administrador
                  </label>
                  <div className='relative'>
                    <User className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300' />
                    <input
                      id='admin-empresa'
                      type='text'
                      placeholder='Nombre completo del administrador'
                      value={empresasData.admin}
                      onChange={(e) =>
                        setEmpresasData({
                          ...empresasData,
                          admin: e.target.value,
                        })
                      }
                      className='w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white'
                    />
                  </div>
                </div>

                {/* BOTÓN enviar */}
                <button
                  onClick={handleLoginEmpresas}
                  className='w-full bg-linear-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg'
                >
                  Crear Empresa
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <p className='text-center text-sm text-purple-200 mt-8'>
          Sistema seguro de autenticación • © 2025
        </p>
      </div>

      {/* Animación FadeIn */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  )
}

export default Auth
