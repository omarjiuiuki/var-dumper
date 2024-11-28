import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

<<<<<<< HEAD
import DashboardAdminMain from './views/dashboard admin/pages/dashboard_admin_main.jsx'
=======
import DashboardAdminMain from './dashboard_admin_main.jsx'
import DashboardEnseignantMain from './views/dashboard enseignant/dashboard_enseignant_main.jsx'
import DashboardEnterpriseMain from './views/dashboard entreprise/dashboard_entreprise_main.jsx'
import DashboardEtudiantMain from './views/dashboard_etudiant/dashboard_etudiant_main.jsx'
>>>>>>> 38cc1f358732014372eef06ab66ce81280c856bf


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashboardEtudiantMain />
  </StrictMode>,
);

reportWebVitals();