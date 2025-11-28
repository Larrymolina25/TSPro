// Importamos React y el hook useState para manejar estados
import { useState } from 'react'

// Importamos iconos desde lucide-react
import { Building2, Mail, Lock, User, Hash, Users } from 'lucide-react'

const Auth = () => {
  // TAB ACTIVO (usuarios o empresas)
  const [activeTab, setActiveTab] = useState('usuarios')

  // ESTADO para el formulario de usuarios
  const [usuariosData, setUsuariosData] = useState({
    empresa: '',
    identificacion: '',
    correo: '',
    password: '',
  })

  // ESTADO para el formulario de empresas
  const [empresasData, setEmpresasData] = useState({
    usuario: '',
    password: '',
  })

  // VALIDACIÓN del login de Usuarios
  const handleLoginUsuarios = () => {
    // Verifica que todos los campos estén llenos
    if (
      usuariosData.empresa &&
      usuariosData.identificacion &&
      usuariosData.correo &&
      usuariosData.password
    ) {
      alert('✓ Login de Usuario exitoso')
      console.log('Datos Usuario:', usuariosData)
      // Aquí podrías redireccionar: navigate('/dashboard-usuarios')
    } else {
      alert('⚠ Por favor completa todos los campos')
    }
  }

  // VALIDACIÓN del login de Empresas
  const handleLoginEmpresas = () => {
    if (empresasData.usuario && empresasData.password) {
      alert('✓ Login de Empresa exitoso')
      console.log('Datos Empresa:', empresasData)
      // Aquí podrías redireccionar: navigate('/dashboard-empresas')
    } else {
      alert('⚠ Por favor completa todos los campos')
    }
  }

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

                {/* Campo: Empresa */}
                <div className='space-y-2'>
                  <label
                    htmlFor='empresa'
                    className='block text-sm font-medium text-white'
                  >
                    Nombre de Empresa
                  </label>
                  <div className='relative'>
                    <Building2 className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300' />
                    <input
                      id='empresa'
                      type='text'
                      placeholder='Ej: TechCorp S.A.S'
                      value={usuariosData.empresa}
                      onChange={(e) =>
                        setUsuariosData({
                          ...usuariosData,
                          empresa: e.target.value,
                        })
                      }
                      className='w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white'
                    />
                  </div>
                </div>

                {/* Campo: Identificación */}
                <div className='space-y-2'>
                  <label
                    htmlFor='identificacion'
                    className='block text-sm font-medium text-white'
                  >
                    Identificación
                  </label>
                  <div className='relative'>
                    <Hash className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300' />
                    <input
                      id='identificacion'
                      type='text'
                      placeholder='Ej: 1234567890'
                      value={usuariosData.identificacion}
                      onChange={(e) =>
                        setUsuariosData({
                          ...usuariosData,
                          identificacion: e.target.value,
                        })
                      }
                      className='w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white'
                    />
                  </div>
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
                  className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg'
                >
                  Iniciar Sesión como Usuario
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
                  <h2 className='text-2xl font-bold text-white mb-1'>Acceso de Empresas</h2>
                  <p className='text-purple-200 text-sm'>Ingresa las credenciales de tu empresa</p>
                </div>

                {/* Campo: Usuario */}
                <div className='space-y-2'>
                  <label
                    htmlFor='usuario-empresa'
                    className='block text-sm font-medium text-white'
                  >
                    Usuario
                  </label>
                  <div className='relative'>
                    <User className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300' />
                    <input
                      id='usuario-empresa'
                      type='text'
                      placeholder='usuario_empresa'
                      value={empresasData.usuario}
                      onChange={(e) =>
                        setEmpresasData({
                          ...empresasData,
                          usuario: e.target.value,
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

                {/* Checkbox + ¿Olvidaste contraseña? */}
                <div className='flex items-center justify-between text-sm mt-4'>
                  <label className='flex items-center text-white cursor-pointer'>
                    <input
                      type='checkbox'
                      className='mr-2 rounded'
                    />
                    <span>Recordar sesión</span>
                  </label>

                  <button className='text-purple-300 hover:text-purple-200 font-medium'>
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* BOTÓN enviar */}
                <button
                  onClick={handleLoginEmpresas}
                  className='w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg'
                >
                  Iniciar Sesión como Empresa
                </button>

                {/* Registro */}
                <div className='text-center mt-6'>
                  <p className='text-purple-200 text-sm'>
                    ¿No tienes cuenta?{' '}
                    <button className='text-white font-semibold hover:text-purple-300'>
                      Regístrate aquí
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <p className='text-center text-sm text-purple-200 mt-8'>
          Sistema seguro de autenticación • © 2024
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
