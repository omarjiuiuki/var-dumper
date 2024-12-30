import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SoutenancesTable.css';




const initialSoutenances = [
        {
    etudiant: 'Alice Dupont',
    groupe: 'Groupe A',
    sujet: 'Analyse des données avec Python',
    salle: 'Salle A',
    examinateur1: 'Dr. Jean Martin',
    examinateur2: 'Dr. Clara Bernard',
    encadrants: 'Dr. Sophie Lambert',
    date: '2024-11-07',
    heureDebut: '10:00',
    heureFin: '11:00',
        },
      
      
  
];

const SoutenancesTable = () => {
  const [soutenances] = useState(initialSoutenances);

 
  
    

  const handleDownload = () => {
    const csvRows = [
      [
        'N°',
        'Groupe',
        'Sujet de la soutenance',
        'Salle',
        'Président',
        'Examinateur 2',
        'Encadrant(s)',
        'Date',
        'Heure de début',
        'Heure de fin',
      ],
      ...soutenances.map((soutenance, index) => [
        index + 1,
        soutenance.groupe,
        soutenance.sujet,
        soutenance.salle,
        soutenance.examinateur1,
        soutenance.examinateur2,
        soutenance.encadrants,
        soutenance.date,
        soutenance.heureDebut,
        soutenance.heureFin,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'planning_soutenances.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

 
 
 
 
  return (
    <>
      <div className="head-soutenance-etu">
        <div className="head-page-soutenance-etu">
          <h1>Planning des Soutenances:</h1>

          <div className="action-button-etu">
          <button onClick={handleDownload}>
            <i className="fas fa-download"></i> {/* Icône de téléchargement */}
            Télécharger
          </button>
          </div>
        </div>
        
        <div className="soutenance-table-etu">
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Groupe</th>
              <th>Sujet de la soutenance</th>
              <th>Salle</th>
              <th>Président</th>
              <th>Examinateur</th>
              <th>Encadrant(s)</th>
              <th>Date</th>
              <th>Heure de début</th>
              <th>Heure de fin</th>
            </tr>
          </thead>
          <tbody>
            {soutenances.map((soutenance, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{soutenance.groupe}</td>
                <td>{soutenance.sujet}</td>
                <td>{soutenance.salle}</td>
                <td>{soutenance.examinateur1}</td>
                <td>{soutenance.examinateur2}</td>
                <td>{soutenance.encadrants}</td>
                <td>{soutenance.date}</td>
                <td>{soutenance.heureDebut}</td>
                <td>{soutenance.heureFin}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    </>
  );
};

export default SoutenancesTable;
