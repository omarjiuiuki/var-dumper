// src/views/ProposalPage.jsx
import React from 'react';
import ProposalForm from './ProjectProposalForm.jsx';

const ProposalPage = ({ addProposal, updateProposal, editingIndex, proposals, setEditingIndex, setFormVisible }) => {
    const handleAddProposal = (title, type, options, description) => {
        addProposal(title, type, options, description);
        setFormVisible(false); // Fermer le formulaire après ajout
    };

    return (
        <div>
            <h1 style={{ textAlign: 'left' }}>Formulaire de Proposition</h1> {/* Aligné à gauche */}
            <div style={{ textAlign: 'left' }}> {/* Conteneur pour aligner le formulaire à gauche */}
                <ProposalForm
                    addProposal={handleAddProposal}
                    updateProposal={updateProposal}
                    editingIndex={editingIndex}
                    proposals={proposals}
                    setEditingIndex={setEditingIndex}
                    setFormVisible={setFormVisible}
                    
                />
            </div>
        </div>
    );
};

export default ProposalPage;