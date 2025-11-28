import { BrowserRouter, Route, Routes } from 'react-router'
import { Auth, Index } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Index />}
        />
        {/* <Route path="/" element={<Index />} /> <Route path="/dashboard" element={<Dashboard />}> <Route path="users" element={<Users />} />
            <Route path="surveys" element={<Surveys />} />
          </Route>
          <Route path="*" element={<NotFound />} />  */}
        <Route
          path='/auth'
          element={<Auth />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
