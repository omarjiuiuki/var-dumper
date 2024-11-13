import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
/*import reactLogo from './assets/react.svg';*/
import viteLogo from '/vite.svg';
import './dashboard_enseignant_main.css';
 //import PageGestionUtilisateur from '../../gestion_des_utilisateurs.jsx';

import { FaBell, FaSearch } from 'react-icons/fa';
/* 
  *
  *
  *   NB :  c'est la main page ne pas toucher s'il vous plait !!!
  *
  *
  *
*/

function DashboardEnseignantMain() {


  const [activePage, setActivePage] = useState("Accueil");

  const pages = {   /* ici il faut cree des page selon le besoin */
    "Accueil": <h2>Accueil</h2>,
    "Utilisateurs":<h2>Utilisateurs</h2>,
    "Gestions Des PFEs": <h2>Gestions Des PFEs</h2>,
    "Comptes": <h2>Gestion des Comptes</h2>,
    "Emails et Notifications": <h2>Gestion des Emails et Notifications</h2>,
    "Paramètres": <h2>Paramètres du système</h2>,
  };


  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className='logo'>
        <h3>Tableau de Bord enseigant</h3>
        
        </div>
        
        <ul>
          {Object.keys(pages).map((page) => (
            <li 
             key={page} 
             onClick={() => setActivePage(page)}
             className={activePage === page ? 'active-page' : ''}
             >
              {page}
            </li>
          ))}
        </ul>
      </nav>
      <div className="content">
        <div className="appBar">
        
            <form className='search-form' action="">
            <input type="text" className='search' placeholder='Recherche...'/>
            <button type='submit' className='search-button'><FaSearch /></button>
            </form> 
         
             
              
           <div className='account-notif-block'>
               <button onClick={()=>{
                   alert('Bonjour enseignant');
                }}>Admin</button>
               <button onClick={()=>{
                    alert('Bonjour enseignant');
                 }}><FaBell size={17}/></button>
           </div>
            
        </div>

        {pages[activePage]}
      
      </div>
    </div>
  );
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
  
}

export default DashboardEnseignantMain;
