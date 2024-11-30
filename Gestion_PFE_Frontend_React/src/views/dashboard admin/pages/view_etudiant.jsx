
 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { FaPen, FaSearch, FaTrash } from 'react-icons/fa';
import Utilisateur from '../../../models/utilisateur';
import Etudiant from '../../../models/etudiant';
import '../styles/view_etudiant.css';
import UlNavigation from '../../../components/my_ul_navigation_list';
import UseFetchEtudiants from '../../../data/etudiant_data';
import { data } from 'autoprefixer';

function ViewEtudiant() {


  
   const [activeTypeUtilisateur, setActivePage] = useState("Etudiant");

  const typeUtilisateur = {
    "Etudiant": <h2>Etudiant</h2>,
    "Enseignant": <h2>Enseignant</h2>,
    "Entreprise": <h2>Entreprise</h2>,
   };

 

 
 

  const [searchEtu, setSearchEtu] = useState('Nom/Prénom');
 
  const typeSearch = {
    "Nom/Prénom": <h2>Etudiant</h2>,
    "Email": <h2>Enseignant</h2>,
    "Intitulé Option": <h2>Entreprise</h2>,
   };

  
  //const [dataEtu, setDataEtu] = useState([]);
 // const [loading, setLoading] = useState(true);
  const [isSelectedStudent, setSelected] = useState(null);
  
    

  const { dataEtu, loading, filteredList,searchTerm ,handleSearchChange} = UseFetchEtudiants();



  /*
   // Déterminer le type d'input en fonction de `searchEtu`
   const typeInputSearch = () => {
    let placeholder = '';
    let inputType = 'text';

    if (searchEtu === 'Nom/Prénom') {
      placeholder = 'Nom/Prénom...';
    } else if (searchEtu === 'Email') {
      inputType = 'email';
      placeholder = 'Email...';
    } else if (searchEtu === 'Intitulé Option') {
      placeholder = 'Intitulé option...';
    }

    return <input 
        type={inputType} 
         className={`${searchEtu.toLowerCase().replace(/[ /]/g, '-')}-search`} 
         placeholder={placeholder} 
         onChange={handleSearchChange}
         />;
  };


  */
    // Déterminer le type d'input en fonction de `searchEtu`
  const inputSearch = () => {
 
   return <input type='text'
                 name='search-input' 
                 className={`${searchEtu.toLowerCase().replace(/[ /]/g, '-')}-search`}
                 placeholder='Recherche...'
                 value={searchTerm} // Bind to state
                 onChange={handleSearchChange} // Update search term 
                />;
 };
  
  


// Effect to fetch data when the component mounts
  useEffect(() => {
   /* fetch('http://localhost:8000/api/affiche-etudiants')
      .then(response => response.json())
      .then(data => {
        // Transformer les données récupérées en instances de modèles
        const etudiantsData = data.map(item => ({
          utilisateur: new Utilisateur(item.nom, item.prenom, item.email, item.type_utilisateur),
          etudiant: new Etudiant(item.intitule_option_master1, item.moyenne_m1)
        }));
        setDataEtu(etudiantsData);
        setLoading(false);
      });*/

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
    // Render loading indicator if still loading
    if (loading) {
      return (
        <div className="loading-indicator">
          <ClipLoader color="#00BFFF" loading={loading} size={50} />
          <p>Chargement...</p>
        </div>
      );
    }
    if (dataEtu.length == 0) {
      return (
        <div className='no-data'>
          <p>Aucun Etudiant Trouver...</p>
        </div>
      );
    }
    // If filteredList is not empty, render the filtered list
    if (filteredList.length > 0) {
      return (
        <table className='style-table'>
          <thead>
            <tr>
              <th>N°</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Role utilisateur</th>
              <th>Intitulé Option</th>
              <th>Moyenne Master 1</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((entrer, index) => (
              <tr
                className={isSelectedStudent === index ? 'is-selected-student' : ''}
                key={index}
                onClick={() => {
                  setSelected(index);
                }}
                onDoubleClick={() => {
                  // Handle double click event if needed
                }}
              >
                <td>{index + 1}</td>
                <td>{entrer.utilisateur.nom}</td>
                <td>{entrer.utilisateur.prenom}</td>
                <td>{entrer.utilisateur.email}</td>
                <td>{entrer.utilisateur.type_utilisateur}</td>
                <td>{entrer.etudiant.intitule_option_master1}</td>
                <td>{entrer.etudiant.moyenne_m1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  
    // If dataEtu is available and filteredList is empty, render dataEtu
    if (dataEtu && dataEtu.length > 0) {
      return (
        <table className='style-table'>
          <thead>
            <tr>
              <th>N°</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Role utilisateur</th>
              <th>Intitulé Option</th>
              <th>Moyenne Master 1</th>
          
            </tr>
          </thead>
          <tbody>
            {dataEtu.map((entrer, index) => (
              <tr
                className={isSelectedStudent === index ? 'is-selected-student' : ''}
                key={index}
                onClick={() => {
                  setSelected(index);
                }}
                onDoubleClick={() => {
                  // Handle double click event if needed
                }}
              >
                <td>{index + 1}</td>
                <td>{entrer.utilisateur.nom}</td>
                <td>{entrer.utilisateur.prenom}</td>
                <td>{entrer.utilisateur.email}</td>
                <td>{entrer.utilisateur.type_utilisateur}</td>
                <td>{entrer.etudiant.intitule_option_master1}</td>
                <td>{entrer.etudiant.moyenne_m1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }

  return (
    <>
      {
        <div className="search-filter">
          <div className="filter-link">
            <div className="type-search">
              <p>Chercher un etudiant :</p>

              {inputSearch()}
            </div>

            <div className="modif-link">
              {
                // ! ici on doit envoyer un parametre avec les bouton
              }
              <Link to={`${window.location.pathname}/ajouter`}>Ajouter </Link>
              <Link to={`${window.location.pathname}/modifier`}>modifier </Link>
              <Link to={`${window.location.pathname}/supprimer`}>supprimer</Link>
            </div>
          </div>
        </div>
      }

      {setTypeUtilisateur()}
    </>
  );
}

export default ViewEtudiant;