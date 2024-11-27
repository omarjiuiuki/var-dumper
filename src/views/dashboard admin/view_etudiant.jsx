
 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { FaPen, FaTrash } from 'react-icons/fa';
import Etudiant from '../../models/etudiant';
import Utilisateur from '../../models/utilisateur';



function AfficheEtu() {


  
   const [activeTypeUtilisateur, setActivePage] = useState("Etudiant");

  const typeUtilisateur = {
    "Etudiant": <h2>Etudiant</h2>,
    "Enseignant": <h2>Enseignant</h2>,
    "Entreprise": <h2>Entreprise</h2>,
   };



  const [UtilisateurtDetails, setDetails] = useState([]);

  
  const [dataEtu, setDataEtu] = useState([]);
  const [loading, setLoading] = useState(true);


// Effect to fetch data when the component mounts
  useEffect(() => {
    fetch('http://localhost:8000/api/affiche-etudiants')
      .then(response => response.json())
      .then(data => {
        // Transformer les données récupérées en instances de modèles
        const etudiantsData = data.map(item => ({
          utilisateur: new Utilisateur(item.nom, item.prenom, item.email, item.type_utilisateur),
          etudiant: new Etudiant(item.intitule_option_master1, item.moyenne_m1)
        }));
        setDataEtu(etudiantsData);
        setLoading(false);
      });
  }, []);



  const setTypeUtilisateur = () => {
    return dataEtu.length?(
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Type utilisateur</th>
            <th>Intitulé Option</th>
            <th>Moyenne Master 1</th>
           
          </tr>
        </thead>
        <tbody>
          {dataEtu.map((entrer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entrer.utilisateur.nom}</td>
                <td>{entrer.utilisateur.prenom}</td>
                <td>{entrer.utilisateur.email}</td>
                <td>{entrer.utilisateur.type_utilisateur}</td>
                <td>{entrer.etudiant.intitule_option_master1}</td>
                <td>{entrer.etudiant.moyenne_m1}</td>
               {/* <td colSpan={2}>
                  <button style={{ width: '50%' }} onClick={() => alert('Edit function here')}>
                    <FaPen />
                  </button>
                  <button style={{ width: '50%' }} onClick={() => alert('Delete function here')}>
                    <FaTrash />
                  </button>
                </td>
                */}
              </tr>
            ))}
        </tbody>
      </table>
    )
    :(
      <div className="loading-indicator">
        <ClipLoader color="#00BFFF" loading={loading} size={50} />
        <p>Chargement...</p>
      </div>
    );
  };

  return (
    <>
        {setTypeUtilisateur()}
   </>
  );
}

export default AfficheEtu;