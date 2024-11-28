import { useState, useEffect } from "react";
import Utilisateur from "../models/utilisateur";
import Etudiant from '../models/etudiant';


const UseFetchEtudiants = () => {
  const [dataEtu, setDataEtu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  


  
  useEffect(() => {
    // Récupération des données
    fetch('http://localhost:8000/api/affiche-etudiants')
      .then(response => response.json())
      .then(data => {
        const etudiantsData = data.map(item => ({
          utilisateur: new Utilisateur(item.nom, item.prenom, item.email, item.type_utilisateur),
          etudiant: new Etudiant(item.intitule_option_master1, item.moyenne_m1),
        }));
        setDataEtu(etudiantsData);
        setLoading(false);
      });


      if (!searchTerm) {
        setFilteredList(dataEtu);
      } else {
        filterList(searchTerm);
      }
   
  }, []);


  // Filter function to search through the list
  const filterList = (searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredData = dataEtu.filter(item => {
      return (
        item.utilisateur.nom.toLowerCase().includes(lowercasedSearchTerm) ||
        item.utilisateur.prenom.toLowerCase().includes(lowercasedSearchTerm) ||
        item.utilisateur.email.toLowerCase().includes(lowercasedSearchTerm) ||
        item.etudiant.intitule_option_master1.toLowerCase().includes(lowercasedSearchTerm) ||
        item.etudiant.moyenne_m1.toString().includes(lowercasedSearchTerm)  // Include number comparison for "moyenne_m1"
      );
    });
    setFilteredList(filteredData);
  };


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterList(value);
  };


  return {
    dataEtu,
    loading,
    filteredList,
    searchTerm,
    handleSearchChange, // Expose handleSearchChange for the search input
  };
};

export default UseFetchEtudiants;
