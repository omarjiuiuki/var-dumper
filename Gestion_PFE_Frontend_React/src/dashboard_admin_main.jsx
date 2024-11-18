import { useState,useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './dashboard_admin_main.css';
import PageGestionUtilisateur from './gestion_des_utilisateurs.jsx';
import DateCloture from './date_cloture.jsx';
import Login from './components/Login';

import { ClipLoader } from 'react-spinners';
import { FaBell, FaSearch } from 'react-icons/fa';
import AddUserForm  from './admin_users_switch_pages.jsx';
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

  const pages = [
    { name: "Accueil", path: "/", component:  <div className="loading-indicator">
                                              <ClipLoader color="#00BFFF" loading={true} size={40} />
                                              <p>Chargement...</p>
                                              </div> },
    { name: "Utilisateurs", path: "/utilisateurs", component:  <PageGestionUtilisateur /> },
    { name: "Gestions Des PFEs", path: "/gestions-des-pfes", component:  <h1>Gestions Des PFEs</h1> },
    { name: "Date de Cloture", path: "/date-de-cloture", component: <DateCloture/> },
    { name: "Login", path: "/login", component: <Login/> },
    { name: "Ajouter utilisateurs", path: "/ajouter-utilisateurs", component: <AddUserForm/> },
  ];

  return (
  <Router>
    <div className="dashboard">
      <nav className="sidebar">
        <div className='logo'>
        <h3>Tableau de Bord</h3>
        
        </div>
        
        <PageList pages={pages} activePage={activePage} setActivePage={setActivePage} />
       
       
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
      </nav>
      <div className="content">
        <div className="appBar">
        
            <form className='search-form' action="">
            <input type="text" className='search' placeholder='Recherche...'/>
            <button type='submit' className='search-button'><FaSearch /></button>
            </form> 
         
             
              
           <div className='account-notif-block'>
               <button onClick={()=>{
                   alert('Bonjour admin');
                }}>Admin</button>
               <button onClick={()=>{
                    alert('Bonjour admin');
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



  //fonction pour la localisation de la route active 
  function PageList({ pages, activePage, setActivePage }) {
    const location = useLocation();
  
    // Mettre à jour `activePage` lorsqu'on navigue en arrière ou en avant
    useEffect(() => {
      const currentPage = pages.find(page => page.path === location.pathname);
      if (currentPage) {
        setActivePage(currentPage.name);
      }
    }, [location, pages, setActivePage]);
  
    return (
      <ul>
        {pages.map(({ name, path }) => (
          <li
            key={name}
           
            className={activePage === name ? 'active-page' : ''}
          >
           <Link to={path} onClick={() => setActivePage(name)}>
            {name}
          </Link>
          </li>
        ))}
      </ul>
    );
  }
 



/*
  const [activePage, setActivePage] = useState("Accueil");

  const pages = {
    "Accueil": <h2>Accueil</h2>,
    "Utilisateurs": <PageGestionUtilisateur />,
    "Gestions Des PFEs": <h2>Gestions Des PFEs</h2>,
    "Date de Cloture": <DateCloture />,
    "Login": <Login />,
    "Ajouter Utilisateurs":<AddUserForm  />,
  };


  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className='logo'>
        <h3>Tableau de Bord</h3>
        <img src={reactLogo} alt="Logo React" />
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
                   alert('Bonjour Admin');
                }}>Admin</button>
               <button onClick={()=>{
                    alert('Bonjour Admin');
                 }}><FaBell size={17}/></button>
           </div>
            
        </div>

        {pages[activePage]}
      
      </div>
    </div>
  );*/


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

export default DashboardAdminMain;
