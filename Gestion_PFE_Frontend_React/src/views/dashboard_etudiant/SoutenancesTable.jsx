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
        {
          etudiant: 'Bob Lemoine',
          groupe: 'Groupe B',
          sujet: 'Développement d’une application mobile',
          salle: 'Salle B',
          examinateur1: 'Dr. Luc Moreau',
          examinateur2: 'Dr. Anne Girard',
          encadrants: 'Dr. Julie Lefèvre',
          date: '2024-11-08',
          heureDebut: '13:00',
          heureFin: '14:30',
        },
        {
          etudiant: 'Chloé Petit',
          groupe: 'Groupe C',
          sujet: 'Automatisation des processus industriels',
          salle: 'Salle C',
          examinateur1: 'Dr. Paul Rousseau',
          examinateur2: 'Dr. Isabelle Fontaine',
          encadrants: 'Dr. Marc Vidal',
          date: '2024-11-09',
          heureDebut: '09:00',
          heureFin: '10:30',
        },
        {
          etudiant: 'David Morel',
          groupe: 'Groupe D',
          sujet: 'Optimisation des algorithmes IA',
          salle: 'Salle D',
          examinateur1: 'Dr. Hélène Roy',
          examinateur2: 'Dr. Philippe Durand',
          encadrants: 'Dr. Camille Dupuis',
          date: '2024-11-10',
          heureDebut: '11:00',
          heureFin: '12:00',
        },
        {
          etudiant: 'Emma Leroy',
          groupe: 'Groupe E',
          sujet: 'Sécurité des systèmes informatiques',
          salle: 'Salle E',
          examinateur1: 'Dr. Patrick Renard',
          examinateur2: 'Dr. Sandra Noel',
          encadrants: 'Dr. Adrien Boucher',
          date: '2024-11-11',
          heureDebut: '15:00',
          heureFin: '16:30',
        },
        {
          etudiant: 'Florian Dubois',
          groupe: 'Groupe F',
          sujet: 'Impact de l’IoT sur la société',
          salle: 'Salle F',
          examinateur1: 'Dr. Louis Millet',
          examinateur2: 'Dr. Manon Faure',
          encadrants: 'Dr. Jérôme Pons',
          date: '2024-11-12',
          heureDebut: '08:30',
          heureFin: '10:00',
        },
        {
          etudiant: 'Gabrielle Fournier',
          groupe: 'Groupe G',
          sujet: 'Énergies renouvelables et développement durable',
          salle: 'Salle G',
          examinateur1: 'Dr. Vincent Garnier',
          examinateur2: 'Dr. Laura Marchand',
          encadrants: 'Dr. Cédric Masson',
          date: '2024-11-13',
          heureDebut: '14:00',
          heureFin: '15:30',
        },
        {
          etudiant: 'Hugo Simon',
          groupe: 'Groupe H',
          sujet: 'Conception d’un site web e-commerce',
          salle: 'Salle H',
          examinateur1: 'Dr. Élodie Barre',
          examinateur2: 'Dr. Antoine Leclerc',
          encadrants: 'Dr. Nathalie Colin',
          date: '2024-11-14',
          heureDebut: '10:00',
          heureFin: '11:30',
        },
        {
          etudiant: 'Isabelle Martin',
          groupe: 'Groupe I',
          sujet: 'Amélioration de la reconnaissance vocale',
          salle: 'Salle I',
          examinateur1: 'Dr. Alain Lefebvre',
          examinateur2: 'Dr. Claire Chauvin',
          encadrants: 'Dr. Stéphane Richard',
          date: '2024-11-15',
          heureDebut: '09:30',
          heureFin: '11:00',
        },
        {
          etudiant: 'Julien Perrin',
          groupe: 'Groupe J',
          sujet: 'Blockchain et cryptomonnaies',
          salle: 'Salle J',
          examinateur1: 'Dr. Christine Laurent',
          examinateur2: 'Dr. Mathieu Olivier',
          encadrants: 'Dr. Sarah Duval',
          date: '2024-11-16',
          heureDebut: '16:00',
          heureFin: '17:30',
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
