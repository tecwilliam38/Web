import { createRoot } from 'react-dom/client'
import "./styles/global.css"
import Rotas from "./rotas"
import { AuthProvider } from './constants/authContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Rotas />
  </AuthProvider>
)
