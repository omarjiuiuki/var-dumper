import React, { useState } from 'react';
import'./SelectionProjets.css';

function SelectionProjets() {
  const [selectedProjects, setSelectedProjects] = useState([]); // Projets sélectionnés
  const [confirmedProjects, setConfirmedProjects] = useState([]); // Projets confirmés
  const projects = [
    { id: 1, title: "Projet A", description: "Description du Projet A" },
    { id: 2, title: "Projet B", description: "Description du Projet B" },
    { id: 4, title: "Projet c", description: "Description du Projet C" },
    { id: 5, title: "Projet d", description: "Description du Projet d" },
    { id: 6, title: "Projet f", description: "Description du Projet f" },
    { id: 8, title: "Projet g", description: "Description du Projet g" },

    // Ajoutez d'autres projets ici
  ];

  const toggleProjectSelection = (projectId) => {
    setSelectedProjects(prevSelected => 
      prevSelected.includes(projectId)
        ? prevSelected.filter(id => id !== projectId) // Désélectionner le projet
        : [...prevSelected, projectId] // Sélectionner le projet
    );
  };

  const handleSubmit = () => {
    // Ajouter les projets sélectionnés à confirmedProjects
    setConfirmedProjects(prevConfirmed => [
      ...prevConfirmed,
      ...selectedProjects.filter(id => !prevConfirmed.includes(id)) // Ajouter uniquement les nouveaux projets
    ]);
    alert("Projets sélectionnés enregistrés !");
    // Réinitialiser les projets sélectionnés après confirmation
    setSelectedProjects([]); // Réinitialise la sélection pour que l'utilisateur puisse choisir de nouveaux projets
  };

  // Filtrer les projets disponibles pour exclure ceux qui sont confirmés
  const availableProjects = projects.filter(project => 
    !confirmedProjects.includes(project.id)
  );

  return (
    <div className="selection-projets">
      <h1>Sélectionner des Projets à Encadrer</h1>
      
      {/* Section pour les projets disponibles */}
      <h2>Projets Disponibles</h2>
      <ul>
        {availableProjects.map(project => (
          <li key={project.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedProjects.includes(project.id)}
                onChange={() => toggleProjectSelection(project.id)}
              />
              <strong>{project.title}</strong>: {project.description}
            </label>
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit}>Confirmer la Sélection</button>

      {/* Section pour les projets encadrés, affichée après confirmation */}
      {confirmedProjects.length > 0 && (
        <>
          <h2>Projets Encadrés</h2>
          <ul>
            {confirmedProjects.map(projectId => {
              const project = projects.find(p => p.id === projectId);
              return (
                <li key={project.id}>
                  <strong>{project.title}</strong>: {project.description}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default SelectionProjets;