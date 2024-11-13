import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import viteLogo from '/vite.svg';
import './dashboard_etudiant_main.css';
//import PageGestionUtilisateur from '../../gestion_des_utilisateurs';

import { FaBell, FaSearch } from 'react-icons/fa';
/* 
  *
  *
  *   NB :  c'est la main page ne pas toucher s'il vous plait !!!
  *
  *
  *
*/

function DashboardEtudiantMain() {
  const [activePage, setActivePage] = useState("Accueil");

  const pages = [
    { name: "Accueil", path: "/", component: <h1>Accueil</h1> },
    { name: "Utilisateurs", path: "/utilisateurs", component:  <h1>Utilisateurs</h1> },
    { name: "Gestions Des PFEs", path: "/gestions-des-pfes", component:  <h1>Gestions Des PFEs</h1> },
    { name: "Comptes", path: "/comptes", component: <h1>Comptes</h1> },
    { name: "Emails et Notifications", path: "/emails-notifications", component:  <h1>Emails et Notifications</h1> },
    { name: "Paramètres", path: "/parametres", component:  <h1>Paramètres</h1> },
  ];

  return (
  <Router>
    <div className="dashboard">
      <nav className="sidebar">
        <div className='logo'>
        <h3>Tableau de Bord etudiant</h3>
        
        </div>
        
        <ul>
          {pages.map(({ name, path }) => (
             /*  ici le il faut revoir le css car le link n'est pas comme le li */
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

        <Routes>
            {pages.map(({ path, component }) => (
              <Route key={path} path={path} element={component} />
            ))}
          </Routes>

       
      
      </div>
    </div>
  </Router>
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

export default DashboardEtudiantMain;
