import { useState,useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import PageGestionUtilisateur from './gestion_des_utilisateurs.jsx';
import DateCloture from './date_cloture.jsx';
import Login from '../../Login pages/Login.jsx';
import '../styles/dashboard_admin_main.css';

import { ClipLoader } from 'react-spinners';
import { FaArrowRight, FaBars, FaBell, FaCross, FaHamburger, FaSearch } from 'react-icons/fa';
import AddUserForm  from './admin_users_switch_pages.jsx';
import HomePage from './home_page.jsx';
import ViewEnseignant from './view_enseignant.jsx';
import PageGestionEmail from './page_gestion_email.jsx';
import GestionPFE from './gestion_pfes.jsx';
import SoutenancesTable from '../pages/SoutenancesTable.jsx';
import { FaArrowLeft, FaX } from 'react-icons/fa6';
import EvoieConfigEmail from './page_envoi_config_email.jsx';
import MesRoutes from '../../../dossier routage/mes_routes.jsx';
import GestionValidationPfe from '../../../ens_responsable_validation_pfe.jsx';
import DetailPagePfe from './detail_page_pfe.jsx';

/* 
  *   
  *
  *   NB :  c'est la main page ne pas toucher s'il vous plait !!!
  *    
  *
  *
*/




function DashboardAdminMain() {

  
  
   
    
  const [activePage, setActivePage] = useState("Accueil");

        /*
          ?voir si je fait pas la app bar que pour la page d'aceuill 
        */
   
  const pages = [
    { name: "Accueil", path: "/", component: <HomePage /> },
    { name: "Utilisateurs", path: "/utilisateurs", component:  <PageGestionUtilisateur /> },
    { name: "Gestions Des PFEs", path: "/gestion-pfe", component: <GestionPFE /> },
    { name: "Gestion Des Emails", path: "/gestions-des-emails", component: <PageGestionEmail /> },
    { name: "Date de Cloture", path: "/date-de-cloture", component: <DateCloture/> },
    { name: "Soutenance", path: "/soutenance", component: <SoutenancesTable/> },
    { name: "Login", path: "/login", component: <Login/> },
    { name: "Ajouter Utilisateurs", path: "/ajouter-utilisateurs", component: <AddUserForm/> },
    { name: "Responsable", path: "/gestion-pfes-validation", component: <GestionValidationPfe/> },

  
    { name: "Login", path: "/login", component: <Login/> },
    { name: "Ajouter Utilisateurs", path: "/ajouter-utilisateurs", component: <AddUserForm/> },
    { name: "Responsable", path: "/gestion-pfes-validation", component: <GestionValidationPfe/> },

  
   
  ];



  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };



  return (
    <Router>
      <div className={`dashboard${isSidebarVisible ? "" : "-expanded"}`}>
        {isSidebarVisible ? (
          <nav className="sidebar">
            <div className="logo">
              <h3>Tableau de Bord</h3>
             
            </div>

           <div className="side-bar-item-container">
           <PageList
              pages={pages}
              activePage={activePage}
              setActivePage={setActivePage}
            />
           </div>

        
          </nav>
        ) : null}

    <div className='content-page'>
        {/* Bouton pour afficher/masquer la sidebar */}
        <div className="drawer-container">
            <button
              className="drawer-button"
              onClick={toggleSidebar}
            >
              {isSidebarVisible ? <FaArrowLeft /> : <FaArrowRight />}
            </button>
          </div>

        <div className={`contenue${isSidebarVisible ? "" : "-expanded"}`}>
       

    

         <Routes>
            {pages.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
            <Route
              path="/gestions-des-emails/configuration"
              element={<EvoieConfigEmail />}
            />

             <Route
              path="/gestion-pfes-validation/detail"
              element={<DetailPagePfe />}
            />
            {/* 
                ici on peut ajouter toute le routes que l'ont veut 
                                
              <Route path="/utilisateurs/ajouter" element={<AjouteUtilisateur />} /> 
              */}
          </Routes>
        </div>

      {/*  <div className={`content${isSidebarVisible ? "" : "-expanded"}`}>
       

    

         <Routes>
            {pages.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
            <Route
              path="/gestions-des-emails/configuration"
              element={<EvoieConfigEmail />}
            />
            {/* 
                ici on peut ajouter toute le routes que l'ont veut 
                                
              <Route path="/utilisateurs/ajouter" element={<AjouteUtilisateur />} /> 
              */}
        {/*  </Routes>
        </div>*/}
        </div>  
      </div>
    </Router>
  );



  //fonction pour la localisation de la route active 
  function PageList({ pages, activePage, setActivePage }) {
    const location = useLocation();

    // Mettre à jour `activePage` lorsqu'on navigue en arrière ou en avant
    useEffect(() => {
      const currentPage = pages.find((page) => page.path === location.pathname);
      if (currentPage) {
        setActivePage(currentPage.name);
      }
    }, [location, pages, setActivePage]);

    return (
      <ul>
        {pages.map(({ name, path }) => (
          <li key={name} className={activePage === name ? "active-page" : ""}>
            <Link to={path} onClick={() => setActivePage(name)}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
 





   {/*
        <div className={`icon-drawer${isSidebarVisible ? "" : "-expanded"}`}><FaHamburger/></div>

             <div className="appBar">
            <form className="search-form" action="">
              <input
                type="text"
                className="search"
                placeholder="Recherche..."
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </form>

            <div className="account-notif-block">
              <button
                onClick={() => {
                  alert("Bonjour admin");
                }}
              >
                Admin
              </button>
              <button
                onClick={() => {
                  alert("Bonjour admin");
                }}
              >
                <FaBell size={17} />
              </button>
            </div>
          </div>
           */}




    {/* <ul>
          {pages.map(({ name, path }) => (
            //  ici le il faut revoir le css car le link n'est pas comme le li 
              <li
                key={name}
                onClick={() => setActivePage(name)}
                className={activePage === name ? 'active-page' : ''}
              >
                <Link to={path}>{name}</Link>
              </li>
          ))}
        </ul>*/}




/*
  const [activePage, setActivePage] = useState("Accueil");

  */}


export default DashboardAdminMain;
