import { useState,useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaFileUpload, FaClipboardCheck, FaArrowRight, FaArrowLeft, FaBell, FaSearch } from 'react-icons/fa';
import SoumettreProjet from './SoumettreProjet.jsx';
import SoutenancesTable from './SoutenancesTable.jsx';
import ChoisirUnProjet from './ChoisirUnProjet.jsx';
import Login from './Login.jsx';
import './dashboard_etudiant_main.css';
import AfficherProjetChoisi from './AfficherProjetChoisi.jsx';

const ProfileModal = ({ show, onClose }) => {
  
  const studentInfo = {
    name: 'Amara Zenati Omar',
    email: 'omar@example.com',
    program: 'Master en Informatique',
    options: 'Genie Logiciel',
  };

  if (!show) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: '0',
        right: '0', // Position de la modale à droite
        width: '300px',
        height: '100%',
        backgroundColor: '#fff',
        boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.3)', // Ombre vers la gauche
        zIndex: '1000',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        paddingTop: '50px',
      }}
    >
      <h3 style={{ textAlign: 'center' }}>Informations de l'étudiant</h3>
      <p><strong>Nom complet:</strong> {studentInfo.name}</p>
      <p><strong>Email:</strong> {studentInfo.email}</p>
      <p><strong>Programme:</strong> {studentInfo.program}</p>
      <p><strong>Option:</strong> {studentInfo.options}</p>
      <button 
        onClick={onClose} 
        style={{
          padding: '10px 20px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Fermer
      </button>
    </div>
  );
};

function DashboardEtudiantMain() {
  const etudiantId = 1;
  const [activePage, setActivePage] = useState("Accueil");
  const [showProfile, setShowProfile] = useState(false);

  const pages = [
   
    { name: "Accueil", path: "/", component:  
    <>
    <div className="appBar">
      <form className='search-form' action="">
        <input type="text" className='search' placeholder='Recherche...' />
        <button type='submit' className='search-button'><FaSearch /></button>
      </form>

      <div className='account-notif-block'>
        <button 
          onClick={() => setShowProfile(true)}  
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#344a5f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img 
            src="./images/photo-profil.jpg"
            alt="Photo de profil" 
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',  
              marginRight: '10px',
            }}
          />
          AZ
        </button>
        <button onClick={() => { alert('Bonjour enseignant'); }}><FaBell size={17}/></button>
      </div>
    </div>

    {/* Affichage de la modale de profil */}
    <ProfileModal show={showProfile} onClose={() => setShowProfile(false)} />
    </>
},
   
    { name: "Soumettre un projet",  path: "/soumettre-projet", component: <SoumettreProjet etudiantId={etudiantId}/> },
    { name: 'Choisir un projet', path: '/choisir-projet', component: <ChoisirUnProjet  etudiantId={etudiantId}/> },
    { name: 'Mes projets', path: '/mes-projets',component: <AfficherProjetChoisi   etudiantId={etudiantId}/> },
    { name: 'Login', path: '/login',component: <Login /> },
    { name: 'Soutenance', path: '/soutenance', component: <SoutenancesTable /> },
    { name: "Emails et Notifications", path: "/emails-notifications", component: <h1>Emails et Notifications</h1> },
  ];



  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };


  return (
    <Router>
      <div className="dashboard-etu">
      {isSidebarVisible ? (
        <nav className="sidebar-etu">
          <div className='logo' style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="./images/logo.png" 
              alt="Logo" 
              style={{ width: '40px', height: '40px', marginRight: '10px' }} 
            />
          </div>

          <div className="side-bar-item-container-etu">
           <PageList
              pages={pages}
              activePage={activePage}
              setActivePage={setActivePage}
            />
           </div>
        </nav>
           ) : null}
        
        <div className='content-page-etu'>
        {/* Bouton pour afficher/masquer la sidebar */}
        <div className="drawer-container-etu">
            <button
              className="drawer-button-etu"
              onClick={toggleSidebar}
            >
              {isSidebarVisible ? <FaArrowLeft /> : <FaArrowRight />}
            </button>
          </div>

        <div className={`contenue-etu${isSidebarVisible ? "" : "-expanded"}`}>
       

    

         <Routes>
            {pages.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
           
            {/* 
                ici on peut ajouter toute le routes que l'ont veut 
                                
              <Route path="/utilisateurs/ajouter" element={<AjouteUtilisateur />} /> 
              */}
          </Routes>
        </div>

    
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




}
export default DashboardEtudiantMain;






/*
  return (
    <Router>
      <div id='menu_div'>
        <ul id='menu' style={{ listStyle: 'none' }}>
          {Menu.map(menu => (
            <li key={menu.name}>
              <Link id='link' to={menu.path}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </div>
       {/*   Ceci est un commentaire dans JSX 
       
         <div id='content_div'>
           <h1>Hello World!</h1>
           <p>hello les amis !!</p>
           <p>{Hi}</p>
           <button onClick={sayHi}>Say HI!</button>
         </div>
       
       */ /*}
      
      
      

      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/activities" element={<h2>Activities Page</h2>} />
        <Route path="/about-us" element={<h2>About Us Page</h2>} />
        <Route path="/shop" element={<h2>Shop Page</h2>} />
      </Routes>
    </Router>
  );*/
  

