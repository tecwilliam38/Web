
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginScreen from './pages/login'
import HomeScreen from './pages/home'


import ProtectedRoute from './constants/protectedRoute'
import PublicRoute from './constants/publicRoute'

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
        }
      />
      {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}



      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />

    </Routes>
  </BrowserRouter>
  )
}

export default App
