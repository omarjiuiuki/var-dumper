// src/views/ProposalForm.jsx
/*import React, { useState, useEffect } from 'react';
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
                <div className="field">
                    <label>Intitulé :</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
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
                <div className="field">
                    <label>Options :</label>
                    <input
                        type="text"
                        name="options"
                        value={formData.options}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
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
                    <p className="error">La date limite de soumission est dépassée.</p> // Message when deadline is passed
                )}
            </form>
        </div>
    );
};

export default ProposalForm;*/
// src/views/ProposalForm.jsx
import React, { useState, useEffect } from 'react';
import './ProposalStyles.css';

const ProposalForm = ({ addProposal, updateProposal, editingIndex, proposals, setEditingIndex, setFormVisible, submissionDeadline }) => {
    const [formData, setFormData] = useState({ title: '', type: '', materials: '', description: '' }); // Ajout de 'materials'
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (editingIndex !== null) {
            const proposalToEdit = proposals[editingIndex];
            setFormData({
                title: proposalToEdit.title,
                type: proposalToEdit.type,
                materials: proposalToEdit.materials, // Assurez-vous que 'materials' est récupéré
                description: proposalToEdit.description
            });
        } else {
            resetForm(); // Réinitialiser le formulaire si pas en mode édition
        }
    }, [editingIndex, proposals]);

    const resetForm = () => {
        setFormData({ title: '', type: '', materials: '', description: '' }); // Réinitialiser 'materials'
    };

    const isBeforeDeadline = new Date(currentDate) < new Date(submissionDeadline);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            updateProposal(editingIndex, formData.title, formData.type, formData.materials, formData.description); // Inclure 'materials'
        } else {
            addProposal(formData.title, formData.type, formData.materials, formData.description); // Inclure 'materials'
        }
        resetForm(); // Réinitialiser le formulaire après soumission
        setFormVisible(false); // Fermer le formulaire
        setEditingIndex(null); // Réinitialiser l'index d'édition
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div style={{
            borderCollapse: 'collapse',
            width: '100%',
            fontSize: '16px',
            padding: '20px',
            marginTop: '10px',
        }}>
            <h2>{editingIndex !== null ? 'Modifier Proposition' : 'Ajouter Proposition'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Intitulé du sujet :</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input"
                        required
                        placeholder="Exemple : Title"
                    />
                </div>
                <div className="field">
                    <label className="label">Type de projet:</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="select"
                    >
                        <option value="">-- Sélectionner --</option>
                        <option value="classique">classique</option>
                        <option value="innovant">innovant</option>
                    </select>
                </div>
                <div className="field">
                    <label className="label">Matériel nécessaire :</label>
                    <textarea
                        name="materials"
                        value={formData.materials}
                        onChange={handleChange}
                        className="textarea"
                        placeholder="Listez le matériel ou les outils nécessaires"
                        rows="3"
                    ></textarea>
                </div>
                <div className="field">
                    <label className="label">Description du projet :</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea"
                        placeholder="Décrivez brièvement votre projet..."
                        rows="5"
                    ></textarea>
                </div>
                {isBeforeDeadline && (
                    <>
                        <button type="submit">{editingIndex !== null ? 'Mettre à jour' : 'Ajouter'}</button>
                        <button type="button" onClick={() => { setFormVisible(false); setEditingIndex(null); }}>Annuler</button>
                    </>
                )}
                {!isBeforeDeadline && (
                    <p className="error">La date limite de soumission est dépassée.</p> // Message lorsque la date limite est dépassée
                )}
            </form>
        </div>
    );
};

export default ProposalForm;