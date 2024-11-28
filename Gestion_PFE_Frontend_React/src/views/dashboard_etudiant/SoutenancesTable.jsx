import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    <div>
        <div  style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
      <h1 className="text-5xl font-bold text-center text-[#2c3e50] p-4 ">
        Planning des Soutenances:
      </h1>


      
  <button
          onClick={handleDownload}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#1abc9c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center', // Aligne l'icône et le texte horizontalement
          }}
        >
          <i className="fas fa-download" style={{ marginRight: '8px' }}></i> {/* Icône de téléchargement */}
          Télécharger
        </button>
</div>



      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          fontSize: '16px',
          padding: '20px',
          marginTop: '10px',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '12px', backgroundColor: '#34495e', color: 'white' }}>N°</th>
            <th style={{ border: '1px solid black', padding: '12px', backgroundColor: '#34495e', color: 'white' }}>Groupe</th>
            <th style={{ border: '1px solid black', padding: '12px', backgroundColor: '#34495e', color: 'white' }}>Sujet de la soutenance</th>
            <th style={{ border: '1px solid black', padding: '12px', backgroundColor: '#34495e', color: 'white' }}>Salle</th>
            <th style={{ border: '1px solid black', padding: '12px', backgroundColor: '#34495e', color: 'white' }}>Président</th>
            <th style={{ border: '1px solid black', padding: '12px', backgroundColor: '#34495e', color: 'white' }}>Examinateur</th>
            <th style={{ border: '1px solid black', padding: '12px', backgroundColor: '#34495e', color: 'white' }}>Encadrant(s)</th>
            <th style={{ border: '1px solid black', padding: '12px', backgroundColor: '#34495e', color: 'white' }}>Date</th>
            <th style={{ border: '1px solid black', padding: '12px', backgroundColor: '#34495e', color: 'white' }}>Heure de début</th>
            <th style={{ border: '1px solid black', padding: '12px', backgroundColor: '#34495e', color: 'white' }}>Heure de fin</th>
          </tr>
        </thead>
        <tbody>
          {soutenances.map((soutenance, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ border: '1px solid black', padding: '10px' }}>{soutenance.groupe}</td>
              
              <td style={{ border: '1px solid black', padding: '10px' }}>
  {soutenance.sujet}
</td>

              <td style={{ border: '1px solid black', padding: '10px' }}>{soutenance.salle}</td>
              <td style={{ border: '1px solid black', padding: '10px' }}>
  {soutenance.examinateur1}
</td>

              <td style={{ border: '1px solid black', padding: '10px' }}>
  {soutenance.examinateur2 }
</td>

              <td style={{ border: '1px solid black', padding: '10px' }}>{soutenance.encadrants}</td>
              <td style={{ border: '1px solid black', padding: '10px' }}>{soutenance.date}</td>
              <td style={{ border: '1px solid black', padding: '10px' }}>{soutenance.heureDebut}</td>
              <td style={{ border: '1px solid black', padding: '10px' }}>{soutenance.heureFin}</td>
            </tr>
          ))}
        </tbody>
      </table>

    
    </div>
);
};

export default SoutenancesTable;
