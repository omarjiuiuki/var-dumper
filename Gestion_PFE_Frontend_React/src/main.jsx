import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import DashboardAdminMain from './views/dashboard admin/pages/dashboard_admin_main.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashboardAdminMain />
  </StrictMode>,
);

reportWebVitals();