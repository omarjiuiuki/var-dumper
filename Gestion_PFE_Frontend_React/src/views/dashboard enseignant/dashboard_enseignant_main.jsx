// src/views/dashboard_enseignant_main.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import viteLogo from '/vite.svg';
import './dashboard_enseignant_main.css';
import ProposalController from '../../controllers/proposalController';
//import ProposalPage from './ProposalPage'; // Vérifiez que le chemin est correctimport ProposalForm from './ProposalForm';
import SelectionProjets from './SelectionProjets'; // Importation du composant SelectionProjets
import { FaBell, FaSearch } from 'react-icons/fa';
import ProposalList from './ProposalList'; // Adjust the path as necessary
import ProposalPage from './ProposalPage'; // Vérifiez que le chemin est correct
const DashboardEnseignantMain = () => {
    const [activePage, setActivePage] = useState("Accueil");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const submissionDeadline = '2026-12-15'; // Exemple de date limite

    const [proposals, setProposals] = useState(ProposalController.getProposals());

    const handleAddProposal = async (title, type, options, description, materials) => {
        const currentDate = new Date();
        const deadlineDate = new Date(submissionDeadline);
    
        if (deadlineDate < currentDate) {
            alert("La date de soumission est dépassée. Vous ne pouvez pas ajouter de proposition.");
            return;
        }
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/proposals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Si vous utilisez un token d'authentification
                },
                body: JSON.stringify({ title, type, options, description, materials, submissionDeadline })
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la proposition');
            }
    
            const result = await response.json();
            setProposals(prev => [...prev, result]); // Ajoutez la nouvelle proposition à l'état
            setIsModalOpen(false);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleUpdateProposal = (index, title, type, options, description, materials) => { // Ajout de 'materials'
        ProposalController.updateProposal(index, title, type, options, description, materials); // Passer 'materials'
        setProposals(ProposalController.getProposals()); // Mettre à jour la liste des propositions
        setIsModalOpen(false);
    };

    const handleEditProposal = (index) => {
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleRemoveProposal = (index) => {
        ProposalController.removeProposal(index); // Call the controller's remove function
        setProposals(ProposalController.getProposals()); // Update the state to reflect the new proposals
    };

    const pages = [
        { name: "Accueil", path: "/", component: <h1>Accueil</h1> },
        { name: "Utilisateurs", path: "/utilisateurs", component: <h1>Utilisateurs</h1> },
        { name: "Gestions Des PFEs", path: "/gestions-des-pfes", component: <h1>Gestions Des PFEs</h1> },
        { name: "Comptes", path: "/comptes", component: <h1>Comptes</h1> },
        { name: "Emails et Notifications", path: "/emails-notifications", component: <h1>Emails et Notifications</h1> },
        { name: "Propositions", path: "/propositions", component: (
            <div>
                <h1 style={{ textAlign: 'center' }}>Propositions</h1>
                <ProposalList 
                    proposals={proposals} 
                    removeProposal={handleRemoveProposal} 
                    setEditingIndex={setEditingIndex} 
                    setFormVisible={setIsModalOpen} 
                    submissionDeadline={submissionDeadline}
                    handleEditProposal={handleEditProposal}
                />
                              
            </div>
        )},
        { name: "Formulaire de Proposition", path: "/formulaire-proposition", component: (
            <ProposalPage 
                addProposal={handleAddProposal}
                updateProposal={handleUpdateProposal}
                editingIndex={editingIndex}
                proposals={proposals}
                setEditingIndex={setEditingIndex}
                setFormVisible={setIsModalOpen}
                submissionDeadline={submissionDeadline}
            />
        )},
        { name: "Sélection Projets", path: "/selection-projets", component: <SelectionProjets /> }
    ];

    return (
        <Router>
            <div className="dashboard">
                <nav className="sidebar">
                    <div className='logo'>
                        <h3>Tableau de Bord Enseignant</h3>
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
                <div className="content">
                    <div className="appBar">
                        <form className='search-form' action="">
                            <input type="text" className='search' placeholder='Recherche...' />
                            <button type='submit' className='search-button'><FaSearch /></button>
                        </form>
                        <div className='account-notif-block'>
                            <button onClick={() => { alert('Bonjour enseignant'); }}>Admin</button>
                            <button onClick={() => { alert('Bonjour enseignant'); }}><FaBell size={17} /></button>
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
}

export default DashboardEnseignantMain;