import React, { useState } from "react";
import "./ChoisirUnProjet.css";
import { FaPaperPlane } from "react-icons/fa";

const projectsData = [
  { 
    id: 1, 
    name: "Développement d'une application mobile", 
    description: "Créer une application mobile pour la gestion des tâches.", 
    teacher: "Prof. Dupont", 
    email: "dupont@universite.com",
  },
  { 
    id: 2, 
    name: "Analyse de données massives", 
    description: "Analyse des grandes bases de données pour extraire des insights.", 
    teacher: "Prof. Martin", 
    email: "martin@universite.com",
  },
  { 
    id: 3, 
    name: "Intelligence Artificielle et Machine Learning", 
    description: "Développer des modèles d'IA pour résoudre des problèmes complexes.", 
    teacher: "Prof. Lefevre", 
    email: "lefevre@universite.com",
  },
  { 
    id: 4, 
    name: "Analyse de la complexité algorithmique", 
    description: "Analyser et optimiser des algorithmes pour des performances accrues.", 
    teacher: "Prof. Dupuis", 
    email: "dupuis@universite.com",
  },
  { 
    id: 5, 
    name: "Cryptographie avancée", 
    description: "Étudier des techniques cryptographiques modernes et leur sécurité.", 
    teacher: "Prof. Moreau", 
    email: "moreau@universite.com",
  },
  { 
    id: 6, 
    name: "Modélisation mathématique", 
    description: "Créer des modèles mathématiques pour résoudre des problèmes industriels.", 
    teacher: "Prof. Girard", 
    email: "girard@universite.com",
  },
  { 
    id: 7, 
    name: "Systèmes de contrôle embarqués", 
    description: "Concevoir des systèmes embarqués pour le contrôle des machines.", 
    teacher: "Prof. Bernard", 
    email: "bernard@universite.com",
  },
  { 
    id: 8, 
    name: "Robotique et automatisation", 
    description: "Développer des robots et des systèmes automatisés pour diverses applications.", 
    teacher: "Prof. Lefevre", 
    email: "lefevre@universite.com",
  },
  { 
    id: 9, 
    name: "Blockchain et Sécurité", 
    description: "Étudier et développer des applications utilisant la blockchain pour la sécurité.", 
    teacher: "Prof. Huber", 
    email: "huber@universite.com",
  },
  { 
    id: 10, 
    name: "Cloud Computing", 
    description: "Concevoir des solutions basées sur le cloud pour les entreprises.", 
    teacher: "Prof. Lemoine", 
    email: "lemoine@universite.com",
  },
  { id: 11, name: "Création d'un site web interactif", description: "Développer un site web interactif avec des fonctionnalités modernes.", teacher: "Prof. Durand", email: "durand@universite.com" },
  { id: 12, name: "Système de gestion de base de données", description: "Concevoir un système de gestion de base de données pour une entreprise.", teacher: "Prof. Rousseau", email: "rousseau@universite.com" },
  { id: 13, name: "Simulation d'un réseau informatique", description: "Créer une simulation d'un réseau informatique pour l'enseignement.", teacher: "Prof. Tremblay", email: "tremblay@universite.com" },
  { id: 14, name: "Applications IoT pour les Smart Homes", description: "Développer des solutions IoT pour la gestion intelligente des maisons.", teacher: "Prof. Morel", email: "morel@universite.com" },
  { id: 15, name: "Système de recommandation", description: "Créer un système de recommandation basé sur l'apprentissage machine.", teacher: "Prof. Gaillard", email: "gaillard@universite.com" },
  { id: 16, name: "Développement de jeux vidéo", description: "Concevoir et développer un jeu vidéo 2D ou 3D.", teacher: "Prof. Lavergne", email: "lavergne@universite.com" },
  { id: 17, name: "Réalité augmentée et réalité virtuelle", description: "Créer des applications pour la réalité augmentée ou virtuelle.", teacher: "Prof. Arnaud", email: "arnaud@universite.com" },
  { id: 18, name: "Systèmes intelligents pour la santé", description: "Développer des systèmes intelligents pour améliorer la santé.", teacher: "Prof. Perrot", email: "perrot@universite.com" },
  { id: 19, name: "Analyse prédictive dans le marketing", description: "Utiliser l'analyse prédictive pour des campagnes marketing.", teacher: "Prof. Colin", email: "colin@universite.com" },
  { id: 20, name: "Systèmes de sécurité avancés", description: "Concevoir des systèmes avancés pour la cybersécurité.", teacher: "Prof. Aubert", email: "aubert@universite.com" },

];

const ChoisirUnProjet = () => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [viewSelected, setViewSelected] = useState(false);
  const [message, setMessage] = useState("");

  const handleProjectChange = (projectName) => {
    if (selectedProjects.length < 10 && !selectedProjects.includes(projectName)) {
      setSelectedProjects([...selectedProjects, projectName]);
    }
  };
/*
  const handleModifyProject = (indexToReplace, newProjectName) => {
    const updatedProjects = [...selectedProjects];
    updatedProjects[indexToReplace] = newProjectName;
    setSelectedProjects(updatedProjects);
  };*/
  const handleModifyProject = (indexToReplace, newProjectName) => {
    // Trouver l'index de l'ancien projet qui est remplacé par le nouveau
    const replacingIndex = selectedProjects.findIndex((project) => project === newProjectName);
  
    // Cloner la liste des projets sélectionnés
    const updatedProjects = [...selectedProjects];
  
    if (replacingIndex !== -1) {
      // Si le projet remplacé est déjà dans la liste, on échange leurs positions
      [updatedProjects[indexToReplace], updatedProjects[replacingIndex]] = [
        updatedProjects[replacingIndex],
        updatedProjects[indexToReplace],
      ];
    } else {
      // Sinon, remplacer simplement le projet à l'index donné
      updatedProjects[indexToReplace] = newProjectName;
    }
  
    setSelectedProjects(updatedProjects);
  };
  
  const handleRemoveProject = (projectName) => {
    setSelectedProjects(selectedProjects.filter((project) => project !== projectName));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Vous avez choisi les projets suivants : ${selectedProjects.join(", ")}`);
  };

  const handleViewToggle = () => {
    setViewSelected(!viewSelected);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className="text-5xl font-bold text-center text-[#2c3e50] p-4 ">Choisir un Projet:</h1>
        <button
          type="submit"
          disabled={selectedProjects.length === 0}
          onClick={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#1abc9c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: selectedProjects.length > 0 ? "pointer" : "not-allowed",
            gap: "8px",
          }}
        >
          <FaPaperPlane style={{ fontSize: "18px" }} /> Envoyer
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleViewToggle}>
          {viewSelected ? "Masquer les projets sélectionnés" : "Voir les projets sélectionnés"}
        </button>
      </div>

      {viewSelected && (
        <div>
          <h3>Projets sélectionnés :</h3>
          <ul>
            {selectedProjects.map((project, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {index + 1}.{" "}
                
                <select
                  onChange={(e) => handleModifyProject(index, e.target.value)}
                  value={project}
                  style={{ marginLeft: "10px" }}
                >
                  <option disabled>Remplacer par :</option>
                  {projectsData
                    .filter((p) => selectedProjects.includes(p.name) || p.name != project)
                    .map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 style={{ fontSize: "24px", color: "#2c3e50", fontWeight: "bold", textAlign: "center", marginTop: "20px" }}>
        Projets disponibles :
      </h2>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "12px", backgroundColor: "#34495e", color: "white" }}>Nom du projet</th>
            <th style={{ border: "1px solid black", padding: "12px", backgroundColor: "#34495e", color: "white" }}>Détails</th>
            <th style={{ border: "1px solid black", padding: "12px", backgroundColor: "#34495e", color: "white" }}>Enseignant</th>
            <th style={{ border: "1px solid black", padding: "12px", backgroundColor: "#34495e", color: "white" }}>Email</th>
            <th style={{ border: "1px solid black", padding: "12px", backgroundColor: "#34495e", color: "white" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {projectsData.map((project) => (
            <tr key={project.id}>
              <td style={{ border: "1px solid black", padding: "10px" }}>{project.name}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{project.description}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{project.teacher}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>{project.email}</td>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                {!selectedProjects.includes(project.name) ? (
                  <button onClick={() => handleProjectChange(project.name)}>Sélectionner</button>
                ) : (
                  <button onClick={() => handleRemoveProject(project.name)} style={{ color: "red" }}>
                    Supprimer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default ChoisirUnProjet;






