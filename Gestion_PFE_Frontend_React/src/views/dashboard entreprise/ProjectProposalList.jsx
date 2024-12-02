import React from 'react';
import { Typography, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import './ProjectProposalStylesList.css';

const ProjectProposalList = ({ projectProposals, removeProjectProposal, setEditingIndex, setFormVisible }) => {
    return (
        <div className="fullscreen" style={{ padding: '20px' }}>
            <Paper elevation={3} sx={{
                backgroundColor: '#ffffff',
                padding: '20px',
                width: '75vw',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                <Typography variant="h4" gutterBottom style={{ color: '#2c3e50', textAlign: 'center' }}>
                    Liste des Projets
                </Typography>
                {projectProposals.length === 0 ? (
                    <Typography variant="body1" style={{ color: '#2c3e50', textAlign: 'center' }}>Aucun projet disponible.</Typography>
                ) : (
                    <List style={{ flexGrow: 1, overflowY: 'auto' }}>
                        {projectProposals.map((proposal, index) => (
                            <ListItem key={index} divider sx={{
                                '&:hover': {
                                    boxShadow: 2,
                                },
                            }}>
                                <ListItemText
                                    primary={<Typography variant="h5" style={{ color: '#2c3e50' }}>{proposal.title}</Typography>}
                                    secondary={<Typography variant="body2" style={{ color: '#2c3e50' }}>Type: {proposal.type}</Typography>}
                                    />
                                    <>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#2c3e50',
                                                color: 'white',
                                                marginRight: '10px',
                                                '&:hover': {
                                                    backgroundColor: '#1abc9c',
                                                },
                                            }}
                                            onClick={() => {
                                                setEditingIndex(index);
                                                setFormVisible(true);
                                            }}
                                        >
                                            Modifier
                                        </Button>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#e74c3c', color: 'white' }}
                                            onClick={() => removeProjectProposal(index)}
                                        >
                                            Supprimer
                                        </Button>
                                    </>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Paper>
            </div>
        );
    };
    
    export default ProjectProposalList;
                               