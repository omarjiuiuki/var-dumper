
import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Link,useLocation} from 'react-router-dom';
import PageGestionUtilisateur from '../views/dashboard admin/pages/gestion_des_utilisateurs.jsx';
import DateCloture from '../views/dashboard admin/pages/date_cloture.jsx';
import Login from '../views/Login pages/Login.jsx';

import AddUserForm  from '../views/dashboard admin/pages/admin_users_switch_pages.jsx';
import HomePage from '../views/dashboard admin/pages/home_page.jsx';
import ViewEnseignant from '../views/dashboard admin/pages/view_enseignant.jsx';
import PageGestionEmail from '../views/dashboard admin/pages/page_gestion_email.jsx';
import GestionPFE from '../views/dashboard admin/pages/gestion_pfes.jsx';
import SoutenancesTable from '../views/dashboard admin/pages/SoutenancesTable.jsx';

import EvoieConfigEmail from '../views/dashboard admin/pages/page_envoi_config_email.jsx';
import DashboardAdminMain from '../views/dashboard admin/pages/dashboard_admin_main.jsx';
import MyApp from '../my_app.jsx';


function MesRoutes() {


 
    const pages = [
        { name: "Accueil", path: "/home/ad", component: <HomePage /> },
        { name: "Utilisateurs", path: "/utilisateurs", component:  <PageGestionUtilisateur /> },
        { name: "Gestions Des PFEs", path: "/gestion-pfe", component: <GestionPFE /> },
        { name: "Gestion Des Emails", path: "/gestions-des-emails", component: <PageGestionEmail /> },
        { name: "Date de Cloture", path: "/date-de-cloture", component: <DateCloture/> },
        { name: "Soutenance", path: "/soutenance", component: <SoutenancesTable/> },
        { name: "Login", path: "/login", component: <Login/> },
        { name: "Ajouter Utilisateurs", path: "/ajouter-utilisateurs", component: <AddUserForm/> },
       
      ];
    



 




  return (


        <Routes>
           {pages.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
        <Route path="/gestions-des-emails/configuration" element={<EvoieConfigEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashad" element={<MyApp />} />
        {/* Vous pouvez ajouter d'autres routes ici */}
        </Routes>
    
  );
}



export default MesRoutes;


