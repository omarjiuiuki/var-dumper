import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

// Exemple de donnees
const initialSoutenances = [
    {
        etudiant: 'Prénom Nom',            
        groupe: 'Groupe A',
        sujet: 'Titre du sujet de soutenance 1',
        salle: 'Salle A',
        examinateur1: '',
        examinateur2: '',
        encadrants: '',
        date: '2024-11-07',
        heureDebut: '10:00',
        heureFin: '11:00',
    },
    {
        etudiant: 'Prénom Nom',
        groupe: 'Groupe B',
        sujet: 'Titre du sujet de soutenance 2',
        salle: 'Salle B',
        examinateur1: '',
        examinateur2: '',
        encadrants: '',
        date: '2024-11-08',
        heureDebut: '13:00',
        heureFin: '14:30',            
    },
];

const SoutenancesTable = () => {
    const [soutenances, setSoutenances] = useState(initialSoutenances);
    const [dateEnvoi, setDateEnvoi] = useState('');
    const [frequenceRelance, setFrequenceRelance] = useState(2); // Fréquence par défaut : 2 jours
    const [relances, setRelances] = useState([]);

    const handleChange = (index, field, value) => {
        const updatedSoutenances = soutenances.map((soutenance, i) =>
            i === index ? { ...soutenance, [field]: value } : soutenance
        );
        setSoutenances(updatedSoutenances);
    };

    const handleAddStudent = () => {
        setSoutenances([
            ...soutenances,
            {
                etudiant: '',
                groupe: 'Groupe',
                sujet: '',
                salle: '',
                examinateur1: '',
                examinateur2: '',
                encadrants: '',
                date: '',
                heureDebut: '',
                heureFin: '',
            },
        ]);
    };

    const handleDeleteStudent = (index) => {
        setSoutenances(soutenances.filter((_, i) => i !== index));
    };

    const generateCSV = () => {
        const rows = [
            ['N°', 'Groupe', 'Sujet', 'Salle', 'Examinateur 1', 'Examinateur 2', 'Encadrants', 'Date', 'Heure de début', 'Heure de fin'],
            ...soutenances.map((soutenance, index) => [
                index + 1,
                `Gr. ${soutenance.groupe}`,
                soutenance.sujet,
                soutenance.salle,
                soutenance.examinateur1,
                soutenance.examinateur2,
                soutenance.encadrants,
                soutenance.date,
                soutenance.heureDebut,
                soutenance.heureFin
            ]),
        ];

        const csvContent = "data:text/csv;charset=utf-8," + rows.map(row => row.join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `planning_soutenances_${dateEnvoi}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSendEmail = () => {
        if (!dateEnvoi) {
            alert("Veuillez saisir une date d'envoi.");
            return;
        }

        // Ici, vous pouvez intégrer une API pour envoyer l'email (comme SendGrid, EmailJS, ou un serveur SMTP).
        alert(`Ce fichier a été envoyé aux étudiants et enseignants pour la date ${dateEnvoi}`);
        calculateRelances(dateEnvoi, frequenceRelance);
    };

    const calculateRelances = (dateEnvoi, frequenceRelance) => {
        const initialDate = new Date(dateEnvoi);
        const relancesList = [];
        let nextRelanceDate = new Date(initialDate);

        for (let i = 1; i <= 5; i++) { // Calculer 5 relances max (cela peut être ajusté)
            nextRelanceDate.setDate(nextRelanceDate.getDate() + frequenceRelance);
            relancesList.push(nextRelanceDate.toISOString().split('T')[0]);
        }

        setRelances(relancesList); // Mettre à jour les dates de relance
    };

    return (
        
        <div>
             <h1 className="text-5xl font-bold text-center text-white bg-[#2c3e50] p-4 rounded-md shadow-lg mb-10">
        Planning des Soutenances:
              </h1>
          <div>
    

    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        {/* Bouton d'ajout d'étudiant */}
        <button
            onClick={handleAddStudent}
            style={{
                padding: '10px 15px',
                cursor: 'pointer',
                backgroundColor: '#1abc9c',
                color: 'white',
                borderRadius: '6px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#16a085')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#1abc9c')}
        >
           <i className="fas fa-plus text-lg font-medium"></i> Ajouter un étudiant
           </button>

        
        {/* Champ pour saisir la date d'envoi */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="dateEnvoi" style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                            Date d'envoi:
                        </label>
                        <input
                            type="date"
                            id="dateEnvoi"
                            value={dateEnvoi}
                            onChange={(e) => setDateEnvoi(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ddd',
                                outline: 'none',
                                fontSize: '16px',
                                transition: 'border-color 0.3s ease',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#1abc9c')}
                            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                        />
                    </div>


         {/* Champ pour saisir la fréquence de relance */}
         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label htmlFor="frequenceRelance" style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                            Fréquence de relance (en jours):
                        </label>
                        <input
                            type="number"
                            id="frequenceRelance"
                            value={frequenceRelance}
                            onChange={(e) => setFrequenceRelance(Number(e.target.value))}
                            min="1"
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ddd',
                                outline: 'none',
                                fontSize: '16px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>

                    {/* Bouton pour envoyer l'email */}
                    <button
                        onClick={handleSendEmail}
                        style={{
                            padding: '12px 25px',
                            fontSize: '16px',
                            fontWeight: '600',
                            backgroundColor: '#1abc9c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#16a085')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#1abc9c')}
                    >
                        Envoyer le planning
                    </button>
    </div>
</div>



            

            {/* Afficher les dates de relance 
            {relances.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>Dates de relance :</h3>
                    <ul>
                        {relances.map((relance, index) => (
                            <li key={index}>Relance {index + 1}: {relance}</li>
                        ))}
                    </ul>
                </div>
            )}*/}
  
     {/* Table pour afficher les soutenances */}
     <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '16px', padding: '20px', marginTop: '40px' }}>
        <thead>
            <tr>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white' }}>N°</th>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white' }}>Groupe</th>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white' }}>Sujet de la soutenance</th>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white' }}>Salle</th>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white' }}>Examinateur 1</th>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white' }}>Examinateur 2</th>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white' }}>Encadrant(s)</th>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white' }}>Date</th>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white' }}>Heure de début</th>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white'}}>Heure de fin</th>
                <th style={{ border: '1px solid black', padding: '12px', textAlign: 'left', backgroundColor: '#34495e', color: 'white' }}>Actions</th>

            </tr>
        </thead>
        <tbody>
            {soutenances.map((soutenance, index) => (
                <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{index + 1}</td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>
                        <input
                            type="text"
                            value={`Gr. ${soutenance.groupe}`}
                            onChange={(e) => handleChange(index, 'groupe', e.target.value.replace(/^Gr.\s*/, ''))}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>
                        <input
                            type="text"
                            value={soutenance.sujet}
                            onChange={(e) => handleChange(index, 'sujet', e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>
                        <input
                            type="text"
                            value={soutenance.salle}
                            onChange={(e) => handleChange(index, 'salle', e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>
                        <input
                            type="text"
                            value={soutenance.examinateur1}
                            onChange={(e) => handleChange(index, 'examinateur1', e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>
                        <input
                            type="text"
                            value={soutenance.examinateur2}
                            onChange={(e) => handleChange(index, 'examinateur2', e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>
                        <input
                            type="text"
                            value={soutenance.encadrants}
                            onChange={(e) => handleChange(index, 'encadrants', e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>
                        <input
                            type="date"
                            value={soutenance.date}
                            onChange={(e) => handleChange(index, 'date', e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>
                        <input
                            type="time"
                            value={soutenance.heureDebut}
                            onChange={(e) => handleChange(index, 'heureDebut', e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td style={{ border: '1px solid black', padding: '10px' }}>
                        <input
                            type="time"
                            value={soutenance.heureFin}
                            onChange={(e) => handleChange(index, 'heureFin', e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                        <button onClick={() => handleDeleteStudent(index)} style={{
                                        padding: '8px 16px',
                                        fontSize: '16px',
                                        backgroundColor: '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                    }}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    


            
        </div>
    );
};

export default SoutenancesTable;