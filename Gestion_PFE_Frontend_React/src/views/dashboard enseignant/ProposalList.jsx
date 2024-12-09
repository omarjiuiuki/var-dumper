import React from 'react';
import { Typography, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import './ProposalStyleslist.css';

const ProposalList = ({ proposals, removeProposal, setEditingIndex, setFormVisible, submissionDeadline }) => {
    const currentDate = new Date();
    console.log("Current Date: ", currentDate); // Log current date
    console.log("Submission Deadline: ", new Date(submissionDeadline)); // Log submission deadline
    console.log(proposals); // Log submission deadline

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
                    List of Proposals
                </Typography>
                {proposals.length === 0 ? (
                    <Typography variant="body1" style={{ color: '#2c3e50', textAlign: 'center' }}>No proposals available.</Typography>
                ) : (
                    <List style={{ flexGrow: 1, overflowY: 'auto' }}>
                        {proposals.map((proposal, index) => (
                            <ListItem key={index} divider sx={{
                                '&:hover': {
                                    boxShadow: 2,
                                },
                            }}>
                                <ListItemText
                                    primary={<Typography variant="h5" style={{ color: '#2c3e50' }}>{proposal.title}</Typography>}
                                    secondary={<Typography variant="body2" style={{ color: '#2c3e50' }}>Type: {proposal.type}</Typography>} // Displaying the type
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
                                        Edit
                                    </Button>
                                   <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#e74c3c', color: 'white' }}
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this proposal?")) {
                                                removeProposal(index);
                                            }
                                        }}
                                    >
                                        Delete
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

export default ProposalList;