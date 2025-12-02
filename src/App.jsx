import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth, Dashboard, Index, SurveyFormView, Surveys, Users } from './pages'
import { ToastWrapper } from './layout'

const App = () => {
  return (
    <>
      <ToastWrapper />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Index />}
          />
          <Route
            path='/dashboard'
            element={<Dashboard />}
          >
            <Route
              path='users'
              element={<Users />}
            />
            <Route
              path='surveys'
              element={<Surveys />}
            />
            <Route
              path='preview/:companyId/:id'
              element={<SurveyFormView />}
            />
          </Route>
          <Route
            path='/auth'
            element={<Auth />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
