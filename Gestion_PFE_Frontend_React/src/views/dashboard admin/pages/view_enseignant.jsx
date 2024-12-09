
 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { FaPen, FaTrash } from 'react-icons/fa';
import Enseignant from '../../../models/enseignant';

//import './view_enseignant.css';


function ViewEnseignant() {


  
   



  const [UtilisateurtDetails, setDetails] = useState([]);

  
  const [dataEns, setDataEns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSelectedTeacher, setSelected] = useState(null);


// Effect to fetch data when the component mounts
  useEffect(() => {
    fetch('http://localhost:8000/api/affiche-enseignant')
      .then(response => response.json())
      .then(data => {
        // Transformer les données récupérées en instances de modèles
        const enseignantData = data.map(item => ({
          utilisateur: new Utilisateur(item.nom, item.prenom, item.email, item.type_utilisateur),
          etudiant: new Enseignant(item.grade, item.date_recrutement)
        }));
        setDataEns(enseignantData);
        setLoading(false);
      });

      const handleClickOutside = (event) => {
        // Vérifie si le clic est en dehors du tableau
        if (!event.target.closest("table")) {
          setSelected(null); // Désélectionne
        }
      };
  
      // Ajoute l'événement au document
      document.addEventListener("click", handleClickOutside);
  
      // Nettoyage à la suppression du composant
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };

   
       


  }, []);



  const setTypeUtilisateur = () => {
    return dataEns.length?(
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Role utilisateur</th>
            <th>Grade</th>
            <th>Date de recrutement</th>
           
          </tr>
        </thead>
        <tbody>
          {dataEns.map((entrer, index) => (
              <tr className={isSelectedTeacher === index ? 'is-selected' : ''}
                   key={index} onClick={()=>{
                        setSelected(index);
               }} onDoubleClick={()=>{
               
               }}>
                <td>{index + 1}</td>
                <td>{entrer.utilisateur.nom}</td>
                <td>{entrer.utilisateur.prenom}</td>
                <td>{entrer.utilisateur.email}</td>
                <td>{entrer.utilisateur.type_utilisateur}</td>
                <td>{entrer.enseignant.grade}</td>
                <td>{entrer.enseignant.date_recrutement}</td>
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
        <ClipLoader color="#00BFFF" loading={loading} size={50}/>
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

export default ViewEnseignant;