import { useState } from 'react';
import { FaBell, FaSearch, FaPlus } from 'react-icons/fa'; // Import the plus icon
import './dashboard_entreprise_main.css';

import ProjectProposalList from './ProjectProposalList'; // Ensure the path is correct
import ProjectProposalForm from './ProjectProposalForm'; // Ensure the path is correct

import PageGestionUtilisateur from '../dashboard admin/pages/gestion_des_utilisateurs';

/* 
  *
  *
  *   NB :  c'est la main page ne pas toucher s'il vous plait !!!
  *
  *
  *
*/

function DashboardEnterpriseMain() {
  const [activePage, setActivePage] = useState("Accueil");
  const [projectProposals, setProjectProposals] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const pages = {
    "Accueil": <h2>Accueil</h2>,
    "Utilisateurs": <PageGestionUtilisateur />,
    "Gestions Des PFEs": (
      <>
        {formVisible && (
          <ProjectProposalForm
            addProjectProposal={(proposal) => {
              setProjectProposals([...projectProposals, proposal]);
              setFormVisible(false);
            }}
            setFormVisible={setFormVisible}
            editingIndex={editingIndex}
            updateProjectProposal={(index, updatedProposal) => {
              const updatedProposals = projectProposals.map((proposal, i) => (i === index ? updatedProposal : proposal));
              setProjectProposals(updatedProposals);
              setFormVisible(false);
            }}
          />
        )}
        <ProjectProposalList
          projectProposals={projectProposals}
          removeProjectProposal={(index) => {
            const updatedProposals = projectProposals.filter((_, i) => i !== index);
            setProjectProposals(updatedProposals);
          }}
          setEditingIndex={setEditingIndex}
          setFormVisible={setFormVisible}
        />
      </>
    ),
    "Comptes": <h2>Gestion des Comptes</h2>,
    "Emails et Notifications": <h2>Gestion des Emails et Notifications</h2>,
    "Paramètres": <h2>Paramètres du système</h2>,
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className='logo'>
          <h3>Tableau de Bord entreprise</h3>
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
            <input type="text" className='search' placeholder='Recherche...' />
            <button type='submit' className='search-button'><FaSearch /></button>
          </form>
          <div className='account-notif-block'>
            <button onClick={() => alert('Bonjour entreprise')}>Admin</button>
            <button onClick={() => alert('Bonjour entreprise')}><FaBell size={17} /></button>
          </div>
        </div>
        {/* Add the "Ajouter" button here */}
        {activePage === "Gestions Des PFEs" && (
          <button 
            className="add-proposal-button" 
            onClick={() => setFormVisible(true)}
          >
            <FaPlus /> Ajouter Proposition
          </button>
        )}
        {pages[activePage]}
      </div>
    </div>
  );
}

export default DashboardEnterpriseMain;