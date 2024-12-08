import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import DashboardAdminMain from './views/dashboard admin/pages/dashboard_admin_main.jsx'
import Login from './views/Login pages/Login.jsx';
import MyApp from './my_app.jsx';
import { BrowserRouter as Router } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login/>
  </StrictMode>,
);


reportWebVitals();