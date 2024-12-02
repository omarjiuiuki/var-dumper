// src/views/ProposalForm.jsx
import React, { useState, useEffect } from 'react';
import './ProposalStyles.css';

const ProposalForm = ({ addProposal, updateProposal, editingIndex, proposals, setEditingIndex, setFormVisible, submissionDeadline }) => {
    const [formData, setFormData] = useState({ title: '', type: '', options: '', description: '' });
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (editingIndex !== null) {
            const proposalToEdit = proposals[editingIndex];
            setFormData({ 
                title: proposalToEdit.title, 
                type: proposalToEdit.type, 
                options: proposalToEdit.options, 
                description: proposalToEdit.description 
            });
        } else {
            setFormData({ title: '', type: '', options: '', description: '' });
        }
    }, [editingIndex, proposals]);

    // Check if the current date is before the submission deadline
    const isBeforeDeadline = new Date(currentDate) < new Date(submissionDeadline);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            updateProposal(editingIndex, formData.title, formData.type, formData.options, formData.description);
        } else {
            addProposal(formData.title, formData.type, formData.options, formData.description);
        }
        setFormVisible(false);
        setEditingIndex(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="proposal-form">
            <h2>{editingIndex !== null ? 'Modifier Proposition' : 'Ajouter Proposition'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Intitulé :</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Type :</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="Recherche">Recherche</option>
                        <option value="Développement">Développement</option>
                    </select>
                </div>
                <div>
                    <label>Options :</label>
                    <input
                        type="text"
                        name="options"
                        value={formData.options}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description :</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                {isBeforeDeadline && ( // Show buttons only if before the deadline
                    <>
                        <button type="submit">{editingIndex !== null ? 'Mettre à jour' : 'Ajouter'}</button>
                        <button type="button" onClick={() => { setFormVisible(false); setEditingIndex(null); }}>Annuler</button>
                    </>
                )}
                {!isBeforeDeadline && (
                    <p>La date limite de soumission est dépassée.</p> // Message when deadline is passed
                )}
            </form>
        </div>
    );
};

export default ProposalForm;