import React, { useState } from 'react';
import { Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import './ProjectProposalStyles.css';

const ProjectProposalForm = ({ addProjectProposal, setFormVisible }) => {
    const [formData, setFormData] = useState({ title: '', type: '', options: '', description: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProjectProposal(formData);
        setFormVisible(false);
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h4" gutterBottom style={{ color: '#2c3e50', textAlign: 'center' }}>
                Proposer un Projet
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Intitulé"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Type</InputLabel>
                    <Select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <MenuItem value="Recherche">Recherche</MenuItem>
                        <MenuItem value="Développement">Développement</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Options"
                    name="options"
                    value={formData.options}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Soumettre
                </Button>
                <Button type="button" onClick={() => setFormVisible(false)} variant="outlined" style={{ marginTop: '20px', marginLeft: '10px' }}>
                    Annuler
                </Button>
            </form>
        </Paper>
    );
};

export default ProjectProposalForm;