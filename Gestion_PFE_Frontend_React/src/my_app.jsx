

   //! cette page est la page racine, elle est appeler par la page main 
   //! je l'utilise pour assurer un routage pour toutes l'application 


import { BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import Login from "./views/Login pages/Login";
import PageGestionUtilisateur from './views/dashboard admin/pages/gestion_des_utilisateurs.jsx';
import DateCloture from './views/dashboard admin/pages/date_cloture.jsx';


import AddUserForm  from './views/dashboard admin/pages/admin_users_switch_pages.jsx';
import HomePage from './views/dashboard admin/pages/home_page.jsx';
import ViewEnseignant from './views/dashboard admin/pages/view_enseignant.jsx';
import PageGestionEmail from './views/dashboard admin/pages/page_gestion_email.jsx';
import GestionPFE from './views/dashboard admin/pages/gestion_pfes.jsx';
import SoutenancesTable from './views/dashboard admin/pages/SoutenancesTable.jsx';

import EvoieConfigEmail from './views/dashboard admin/pages/page_envoi_config_email.jsx';
import DashboardAdminMain from './views/dashboard admin/pages/dashboard_admin_main.jsx';
import DashboardEtudiantMain from './views/dashboard_etudiant/dashboard_etudiant_main.jsx';
import DashboardAEnseignantMain from './views/dashboard enseignant/dashboard_enseignant_main.jsx';
import DashboardEntrepriseMain from './views/dashboard entreprise/dashboard_entreprise_main.jsx';


function MyApp() {

    const pages = [
        { name: "Accueil", path: "/dashad/home", component: <HomePage /> },
        { name: "Utilisateurs", path: "/dashad/utilisateurs", component:  <PageGestionUtilisateur /> },
        { name: "Gestions Des PFEs", path: "/dashad/gestion-pfe", component: <GestionPFE /> },
        { name: "Gestion Des Emails", path: "/dashad/gestions-des-emails", component: <PageGestionEmail /> },
        { name: "Date de Cloture", path: "/dashad/date-de-cloture", component: <DateCloture/> },
        { name: "Soutenance", path: "/dashad/soutenance", component: <SoutenancesTable/> },
        { name: "Login", path: "/dashad/login", component: <Login/> },
        { name: "Ajouter Utilisateurs", path: "/dashad/ajouter-utilisateurs", component: <AddUserForm/> },
       
      ];


    return (
   
    <Router>
    <Routes>
     
      <Route path="/" element={<Login />} /> {/* Assurez-vous que la page par défaut est la page de login */}
      <Route path="/login" element={<Login />} />
      <Route path="/dashad" element={<DashboardAdminMain />} />
      <Route path="/dashetu" element={<DashboardEtudiantMain />} />
      <Route path="/dashens" element={<DashboardAEnseignantMain />} />
      <Route path="/dashentr" element={<DashboardEntrepriseMain />} />
    
    </Routes>
  </Router>

  );
}

export default MyApp;

/*
  {pages.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
        <Route path="/home/ad/gestions-des-emails/configuration" element={<EvoieConfigEmail />} /> */