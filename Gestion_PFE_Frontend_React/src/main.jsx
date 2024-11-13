import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DashboardAdminMain from './dashboard_admin_main.jsx'
import DashboardEnseignantMain from './views/dashboard enseignant/dashboard_enseignant_main.jsx'
import DashboardEnterpriseMain from './views/dashboard entreprise/dashboard_entreprise_main.jsx'
import DashboardEtudiantMain from './views/dashboard etudiant/dashboard_etudiant_main.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashboardAdminMain />
  </StrictMode>,
)
