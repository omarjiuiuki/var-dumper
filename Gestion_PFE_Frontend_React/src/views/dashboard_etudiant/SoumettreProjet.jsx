import React, { useState, useEffect } from "react";
import "./SoumettreProjet.css";
import axios from 'axios';

const SoumettreProjet = () => {
  const [formData, setFormData] = useState({
    etudiant_1_id: 2, // Identifiant de l'étudiant (exemple ici, à adapter)
    etudiant_2_id: "",
    type_pfe: "",
    intitule_pfe: "",
    moyenne_m1: 15,
    description: "",
    technologies: "",
    materials: "",
    hasBinome: false,
    binomeName: "",
  });

  const [errors, setErrors] = useState({});
  const [projetId, setProjetId] = useState(null); // ID du projet soumis
  const [isEditable, setIsEditable] = useState(true); // Définit si le formulaire est en mode lecture ou modification

  /**
   * Valider les champs du formulaire
   */
  const validate = () => {
    const newErrors = {};
    if (!formData.etudiant_1_id) newErrors.etudiant_1_id = "Le nom et prénom de l'étudiant 1 sont obligatoires.";
    if (!formData.option) newErrors.option = "L'option est obligatoire.";
    if (!formData.intitule_pfe) newErrors.intitule_pfe = "Le titre du PFE est obligatoire.";
    if (!formData.description || formData.description.length < 20)
      newErrors.description = "Le résumé doit contenir au moins 20 caractères.";
    if (formData.hasBinome && !formData.binomeName)
      newErrors.binomeName = "Le nom du binôme est obligatoire.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Soumettre le projet (POST)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (!projetId) {
        // Soumission initiale
        const response = await axios.post("http://127.0.0.1:8000/api/projet", formData);
        alert("Projet soumis avec succès: " + response.data.message);
        setProjetId(response.data.theme_pfe.id); // Sauvegarde l'ID du projet
      } else {
        // Mise à jour
        const response = await axios.put(`http://127.0.0.1:8000/api/projet/${projetId}`, formData);
        alert("Projet mis à jour avec succès: " + response.data.message);
      }
      //setIsEditable(false); // Désactive les champs après soumission ou mise à jour
    } catch (error) {
      alert("Erreur: " + (error.response?.data?.message || "Veuillez réessayer."));
    }
  };

 /**
   * Réactive les champs pour modification
   */
 const handleEditClick = () => {
  setIsEditable(true); // Active les champs pour modification
};

/**
 * Gère les modifications des champs du formulaire
 */
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });
};


  

  /**
   * Mettre à jour le projet existant (PUT)
   */
  /*
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Utilisation de PUT pour mettre à jour le projet avec l'ID spécifique
      const response = await axios.put(`http://127.0.0.1:8000/api/projet/${projetId}`, formData);
      alert('Projet mis à jour avec succès: ' + response.data.message);
      setIsEditable(false); // Désactive le formulaire après la mise à jour
    } catch (error) {
      alert('Erreur lors de la mise à jour: ' + (error.response?.data?.message || 'Veuillez réessayer.'));
    }
  };*/





  /**
   * Charger les données du projet existant lors de la modification
   */
  useEffect(() => {
    // Vérifier si un projet existe déjà pour l'étudiant en question
    axios.get(`http://127.0.0.1:8000/api/projet/etudiant/${formData.etudiant_1_id}`)
      .then(response => {
        const { theme_pfe } = response.data;
        if (theme_pfe) {
          // Si un projet existe pour cet étudiant, pré-charger les données du projet
          setProjetId(theme_pfe.id);
          setFormData({
            ...theme_pfe,
            etudiant_1_id: theme_pfe.etudiant_1_id,
            etudiant_2_id: theme_pfe.etudiant_2_id || "",
            hasBinome: !!theme_pfe.etudiant_2_id,
          });
          //setIsEditable(false); // Le formulaire est en mode édition
        }
      })
      .catch(error => {
        alert("Erreur lors du chargement du projet: " + (error.response?.data?.message || 'Veuillez réessayer.'));
      });
  }, [formData.etudiant_1_id]); // Recharger les données si l'étudiant change

  return (
    <div style={{
      borderCollapse: 'collapse',
      width: '100%',
      fontSize: '16px',
      padding: '20px',
      marginTop: '10px',
      backgroundColor: '#f9f9f9',  // Couleur de fond claire
      border: '1px solid #ddd',  // Bordure gris clair
      borderRadius: '8px',  // Coins arrondis
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Ombre légère pour effet de profondeur
      color: '#333',  // Couleur du texte plus foncée pour une meilleure lisibilité
      lineHeight: '1.5',  // Espacement entre les lignes pour plus de clarté
      textAlign: 'left',  // Alignement du texte à gauche pour une meilleure lisibilité
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',  // Police moderne et lisible
    }}>
      <h2 className="text-5xl font-bold text-center text-[#2c3e50] p-4">
        Formulaire de Proposition de PFE :
      </h2>
     
      <form onSubmit={handleSubmit} className="form">
      <div>
    {!isEditable ? (
      <button
        type="button" // Empêche la soumission du formulaire
        className="button"
        onClick={handleEditClick}
      >
        Modifier
      </button>
    ) : (
      <button type="submit" className="button">
        {projetId ? "Mettre à jour" : "Soumettre"}
      </button>
    )}
  </div>
        <div className="field">
          <label className="label">Nom et Prénom Étudiant 1 :</label>
          <input
            type="text"
            name="etudiant_1_id"
            value={formData.etudiant_1_id}
            onChange={handleChange}
            className="input"
            placeholder="Nom et Prénom"
            disabled={!isEditable}
          />
          {errors.etudiant_1_id && <p className="error">{errors.etudiant_1_id}</p>}
        </div>

        {/* Nom et Prénom Étudiant 2 (optionnel) */}
        <div className="field">
          <label className="label">Nom et Prénom Étudiant 2 :</label>
          <input
            type="text"
            name="etudiant_2_id"
            value={formData.etudiant_2_id}
            onChange={handleChange}
            className="input"
            placeholder="Nom et Prénom"
            disabled={!isEditable}
          />
        </div>

        {/* Option */}
        <div className="field">
          <label className="label">Option :</label>
          <select
            name="option"
            value={formData.option}
            onChange={handleChange}
            className="select"
            disabled={!isEditable}
          >
            <option value="">-- Sélectionner --</option>
            <option value="GL">GL</option>
            <option value="IA">IA</option>
            <option value="RSD">RSD</option>
            <option value="SIC">SIC</option>
          </select>
          {errors.option && <p className="error">{errors.option}</p>}
        </div>

        {/* Intitulé du PFE */}
        <div className="field">
          <label className="label">Intitulé du PFE :</label>
          <input
            type="text"
            name="intitule_pfe"
            value={formData.intitule_pfe}
            onChange={handleChange}
            className="input"
            placeholder="Exemple : Développement d'une plateforme"
            disabled={!isEditable}
          />
          {errors.intitule_pfe && <p className="error">{errors.intitule_pfe}</p>}
        </div>

        {/* Type de projet */}
        <div className="field">
          <label className="label">Type de projet :</label>
          <select
            name="type_pfe"
            value={formData.type_pfe}
            onChange={handleChange}
            className="select"
            disabled={!isEditable}
          >
            <option value="">-- Sélectionner --</option>
            <option value="classique">classique</option>
            <option value="innovant">innovant</option>
          </select>
          {errors.type_pfe && <p className="error">{errors.type_pfe}</p>}
        </div>

        {/* Résumé */}
        <div className="field">
          <label className="label">Résumé :</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea"
            placeholder="Décrivez brièvement le projet..."
            rows="5"
            disabled={!isEditable}
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        {/* Technologies utilisées */}
        <div className="field">
          <label className="label">Technologies utilisées :</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            className="input"
            placeholder="Liste des technologies (React, Node.js, etc.)"
            disabled={!isEditable}
          />
        </div>

        {/* Matériel nécessaire */}
        <div className="field">
          <label className="label">Besoins Matériels :</label>
          <textarea
            name="materials"
            value={formData.materials}
            onChange={handleChange}
            className="textarea"
            placeholder="Listez le matériel ou les outils nécessaires"
            rows="3"
            disabled={!isEditable}
          ></textarea>
        </div>

        {/* Bouton de soumission */}
         {/* Boutons */}
        
       
   
        
      </form>
    </div>
  );
};

export default SoumettreProjet;


