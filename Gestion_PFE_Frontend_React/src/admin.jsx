import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Typography, Box, Grid, Paper } from '@mui/material';

const Admin = () => {
  const [dates, setDates] = useState({
    period1: '',
    period2: '',
    period3: '',
  });

  const formik = useFormik({
    initialValues: {
      period1: '',
      period2: '',
      period3: '',
    },
    onSubmit: (values) => {
      setDates(values);
      alert('Dates mises à jour avec succès!');
    },
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: '100vh', // Full height of the viewport
        display: 'flex',
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        backgroundColor: '#2c3e50', // Dark background color
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 2,
          backgroundColor: '#ffffff', // White background for the form
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" color="#2c3e50">
          Gestion des Dates de Clôture
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {['period1', 'period2', 'period3'].map((period, index) => (
              <Grid item xs={12} key={period}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body1" color="#2c3e50">
                    Période {index + 1}:
                  </Typography>
                  <TextField
                    id={period}
                    name={period}
                    type="date"
                    value={formik.values[period]}
                    onChange={formik.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ flexGrow: 1, marginLeft: 2 }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => formik.setFieldValue(period, new Date().toISOString().split('T')[0])}
                    sx={{
                      marginLeft: 1,
                      color: '#1abc9c',
                      borderColor: '#1abc9c',
                      '&:hover': { backgroundColor: '#e3f2fd' },
                    }}
                  >
                    Sélectionner Date
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: '#1abc9c',
              '&:hover': { backgroundColor: '#16a085' },
            }}
            type="submit"
          >
            Enregistrer
          </Button>
        </form>

        {/* Affichage des dates actuelles */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom color="#2c3e50">
            Dates Actuelles
          </Typography>
          <Typography color="#2c3e50">
            Période 1: {dates.period1 ? new Date(dates.period1).toLocaleDateString() : 'Non définie'}
          </Typography>
          <Typography color="#2c3e50">
            Période 2: {dates.period2 ? new Date(dates.period2).toLocaleDateString() : 'Non définie'}
          </Typography>
          <Typography color="#2c3e50">
            Période 3: {dates.period3 ? new Date(dates.period3).toLocaleDateString() : 'Non définie'}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Admin;