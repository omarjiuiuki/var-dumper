import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaFileUpload, FaClipboardCheck, FaFolderOpen, FaGraduationCap, FaBell, FaSearch } from 'react-icons/fa';
import SoumettreProjet from './SoumettreProjet.jsx';
import SoutenancesTable from './SoutenancesTable.jsx';
import ChoisirUnProjet from './ChoisirUnProjet.jsx';
import Login from './Login.jsx';


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
  const [activePage, setActivePage] = useState("Accueil");
  const [showProfile, setShowProfile] = useState(false);

  const pages = [
   
    { name: "Accueil", path: "/", component: <h1>Accueil</h1> },
   
    { name: "Soumettre un projet", icon: <FaFileUpload />, path: "/soumettre-projet", component: <SoumettreProjet /> },
    { name: 'Choisir un projet', icon: <FaClipboardCheck />, path: '/choisir-projet', component: <ChoisirUnProjet /> },
    { name: 'Mes projets', icon: <FaFolderOpen />, path: '/mes-projets',component: <Login /> },
    { name: 'Login', icon: <FaFolderOpen />, path: '/login',component: <Login /> },
    { name: 'Soutenance', icon: <FaGraduationCap />, path: '/soutenance', component: <SoutenancesTable /> },
    { name: "Emails et Notifications", path: "/emails-notifications", component: <h1>Emails et Notifications</h1> },
  ];

  return (
    <Router>
      <div className="dashboard">
        <nav className="sidebar">
          <div className='logo' style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="./images/logo.png" 
              alt="Logo" 
              style={{ width: '40px', height: '40px', marginRight: '10px' }} 
            />
          </div>
          <ul>
            {pages.map(({ name, path }) => (
              <li
                key={name}
                onClick={() => setActivePage(name)}
                className={activePage === name ? 'active-page' : ''}  
              >
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="content" style={{ marginRight: showProfile ? '300px' : '0', transition: 'margin-right 0.3s' }}>
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

          <Routes>
            {pages.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
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
  

