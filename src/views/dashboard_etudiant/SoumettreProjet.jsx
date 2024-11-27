//import React from "react";


import React, { useState } from "react";
import "./SoumettreProjet.css"; 

const SoumettreProjet = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    materials: "",
    encadrant: "",
    hasBinome: false,
    binomeName: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Le titre est obligatoire.";
    if (!formData.type) newErrors.type = "Le type de projet est obligatoire.";
    if (!formData.description || formData.description.length < 20)
      newErrors.description =
        "La description est obligatoire et doit contenir au moins 20 caractères.";
    if (formData.hasBinome && !formData.binomeName)
      newErrors.binomeName = "Le nom du binôme est obligatoire.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Données soumises :", formData);
      alert("Formulaire soumis avec succès !");
      setFormData({
        title: "",
        type: "",
        description: "",
        materials: "",
        encadrant: "",
        hasBinome: false,
        binomeName: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div style={{
      borderCollapse: 'collapse',
      width: '100%',
      fontSize: '16px',
      padding: '20px',
      marginTop: '10px',
    }}>
      <h2 className="text-5xl font-bold text-center text-[#2c3e50] p-4 ">
        Formulaire de Proposition de PFE
        </h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Intitulé du sujet */}
        <div className="field">
          <label className="label">Intitulé du sujet :</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
            placeholder="Exemple : Title"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        {/* Type de projet */}
        <div className="field">
          <label className="label">Type de projet :</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select"
          >
            <option value="">-- Sélectionner --</option>
            <option value="classique">classique</option>
            <option value="innovant">innovant</option>
          </select>
          {errors.type && <p className="error">{errors.type}</p>}
        </div>

        {/* Description du projet */}
        <div className="field">
          <label className="label">Description du projet :</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea"
            placeholder="Décrivez brièvement votre projet..."
            rows="5"
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        {/* Matériel nécessaire */}
        <div className="field">
          <label className="label">Matériel nécessaire :</label>
          <textarea
            name="materials"
            value={formData.materials}
            onChange={handleChange}
            className="textarea"
            placeholder="Listez le matériel ou les outils nécessaires"
            rows="3"
          ></textarea>
        </div>

        {/* Encadrant */}
        <div className="field">
          <label className="label">Encadrant (si déjà confirmé) :</label>
          <input
            type="text"
            name="encadrant"
            value={formData.encadrant}
            onChange={handleChange}
            className="input"
            placeholder="Nom de l'encadrant"
          />
        </div>

        {/* Binôme */}
        <div className="field">
          <label className="label">
            <input
              type="checkbox"
              name="hasBinome"
              checked={formData.hasBinome}
              onChange={handleChange}
              className="checkbox"
            />
            Ajouter un binôme
          </label>
        </div>
        {formData.hasBinome && (
          <div className="field">
            <label className="label">Nom du binôme :</label>
            <input
              type="text"
              name="binomeName"
              value={formData.binomeName}
              onChange={handleChange}
              className="input"
              placeholder="Nom du binôme"
            />
            {errors.binomeName && (
              <p className="error">{errors.binomeName}</p>
            )}
          </div>
        )}

        {/* Bouton de soumission */}
        <button type="submit" className="button">
          Soumettre
        </button>
      </form>
    </div>
  );
};





export default SoumettreProjet;
