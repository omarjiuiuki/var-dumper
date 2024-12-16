import React, { useState } from "react";
import "./ChoisirUnProjet.css";
import { FaPaperPlane } from "react-icons/fa";

const projectsData = [
  { 
    id: 1, 
    name: "Développement d'une application mobile", 
    description: "Créer une application mobile pour la gestion des tâches.", 
    teacher: "Prof. Dupont", 
    co_teacher: "Prof. Durand",
    option: "GL", 
    type: "Classique",
    summary: "Une application mobile pour la gestion des tâches personnelles.",
    technologies: "React Native, Firebase",
    material_needs: "Smartphone, PC",
    email: "dupont@universite.com",
  },
  { 
    id: 2, 
    name: "Analyse de données massives", 
    description: "Analyse des grandes bases de données pour extraire des insights.", 
    teacher: "Prof. Martin", 
    co_teacher: "Prof. Bernard",
    option: "IA", 
    type: "Innovant",
    summary: "Développer des outils d'analyse avancée pour les données massives.",
    technologies: "Python, Spark",
    material_needs: "Serveur avec GPU, logiciel Apache Spark",
    email: "martin@universite.com",
  },
  { 
    id: 3, 
    name: "Plateforme collaborative en ligne", 
    description: "Créer une plateforme web pour la collaboration entre équipes.", 
    teacher: "Prof. Leclerc", 
    co_teacher: "Prof. Moreau",
    option: "RSD", 
    type: "Classique",
    summary: "Une plateforme intuitive pour partager des fichiers et gérer les projets.",
    technologies: "Angular, Node.js, MongoDB",
    material_needs: "PC, serveur local",
    email: "leclerc@universite.com",
  },
  { 
    id: 4, 
    name: "Système de gestion d'hôpital", 
    description: "Développer un logiciel de gestion pour les établissements médicaux.", 
    teacher: "Prof. Lambert", 
    co_teacher: "Prof. Garnier",
    option: "GL", 
    type: "Innovant",
    summary: "Simplifier la gestion des patients et du personnel médical.",
    technologies: "Java, Spring Boot, MySQL",
    material_needs: "PC, serveur web",
    email: "lambert@universite.com",
  },
];

const companyProjectsData = [
  {
    id: 1,
    companyName: "TechCorp",
    option: "GL",
    title: "Optimisation des processus industriels",
    summary: "Optimiser les chaînes de production en utilisant des méthodes d'analyse avancées.",
    technologies: "Python, TensorFlow",
  },
  {
    id: 2,
    companyName: "InnovateX",
    option: "IA",
    title: "Développement d'un assistant intelligent",
    summary: "Créer un assistant virtuel intelligent pour automatiser les tâches administratives.",
    technologies: "Node.js, MongoDB, NLP",
  },
  {
    id: 3,
    companyName: "SmartSolutions",
    option: "RSD",
    title: "Systèmes de gestion intelligente",
    summary: "Développer un système intelligent pour gérer les ressources dans un environnement d'entreprise.",
    technologies: "Java, Spring Boot",
  },
  {
    id: 4,
    companyName: "DataVision",
    option: "IA",
    title: "Visualisation avancée des données",
    summary: "Créer des tableaux de bord interactifs pour l'analyse des données.",
    technologies: "React, D3.js, Python",
  },
];



const ChoisirUnProjet = () => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [viewSelected, setViewSelected] = useState(false);
  const [message, setMessage] = useState("");

  const handleProjectChange = (projectName) => {
    if (
      selectedProjects.length < 10 &&
      !selectedProjects.includes(projectName)
    ) {
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
    const replacingIndex = selectedProjects.findIndex(
      (project) => project === newProjectName
    );

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
    setSelectedProjects(
      selectedProjects.filter((project) => project !== projectName)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(
      `Vous avez choisi les projets suivants : ${selectedProjects.join(", ")}`
    );
  };

  const handleViewToggle = () => {
    setViewSelected(!viewSelected);
  };

  return (
    <>
      <div className="choisir-projet-etu">
        <div className="choix-projet-header-etu">
          <h1>Choisir un Projet:</h1>
          <button
            type="submit"
            disabled={selectedProjects.length === 0}
            onClick={handleSubmit}
          >
            <FaPaperPlane /> Envoyer
          </button>
        </div>

        <div className="action-button-choix-etu">
          <button onClick={handleViewToggle}>
            {viewSelected
              ? "Masquer les projets sélectionnés"
              : "Voir les projets sélectionnés"}
          </button>
        </div>

        {viewSelected && (
          <div className="view-project-selected-etu">
            <h3>Projets sélectionnés :</h3>
            <ul>
              {selectedProjects.map((project, index) => (
                <li key={index}>
                  {index + 1}.{" "}
                  {/* Vérifiez si le projet est académique ou d'entreprise */}
                  {projectsData.some((p) => p.name === project) ? (
                    // Si c'est un projet académique
                    <span>{project}</span>
                  ) : (
                    // Si c'est un projet d'entreprise
                    <span>{project}</span>
                  )}
                  <select
                    onChange={(e) => handleModifyProject(index, e.target.value)}
                    value={project}
                  >
                    <option disabled>Remplacer par :</option>
                    {/* Filtrer les projets académiques ET d'entreprise pour éviter de sélectionner un projet déjà présent */}
                    {[...projectsData, ...companyProjectsData].map((p) => (
                      <option key={p.id} value={p.name || p.title}>
                        {p.name || p.title}
                      </option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="projet-list-etu">
         <div className="titre-tab-choix-etu">
         <h2>Projets Académiques :</h2>
         </div>
          <div className="tab-choix-projet-etu">
          <table>
            <thead>
              <tr>
                <th>Nom du projet</th>
                <th>Résumé</th>
                <th>Encadrant</th>
                <th>Co-encadrant</th>
                <th>Option</th>
                <th>Type</th>
                <th>Technologies</th>
                <th>Besoins Matériel</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projectsData.map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.summary}</td>
                  <td>{project.teacher}</td>
                  <td>{project.co_teacher}</td>
                  <td>{project.option}</td>
                  <td>{project.type}</td>
                  <td>{project.technologies}</td>
                  <td>{project.material_needs}</td>
                  <td>
                    {!selectedProjects.includes(project.name) ? (
                      <button onClick={() => handleProjectChange(project.name)}>
                        Sélectionner
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRemoveProject(project.name)}
                        style={{ color: "red" }}
                      >
                        Supprimer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

      
      
        <div className="projet-list-etu">
          <div className="titre-tab-choix-etu">
            <h2>Projets Proposés par les Entreprises :</h2>
          </div>


          
          <div className="tab-choix-projet-etu">
          <table>
            <thead>
              <tr>
                <th>Intitulé du PFE</th>
                <th>Nom de l'entreprise</th>
                <th>Option</th>
                <th>Résumé</th>
                <th>Technologies utilisées</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companyProjectsData.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.companyName}</td>
                  <td>{project.option}</td>

                  <td>{project.summary}</td>
                  <td>{project.technologies}</td>
                  <td>
                    {!selectedProjects.includes(project.title) ? (
                      <button
                        onClick={() => handleProjectChange(project.title)}
                      >
                        Sélectionner
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRemoveProject(project.title)}
                        style={{ color: "red" }}
                      >
                        Supprimer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>
    </>
  );
};

export default ChoisirUnProjet;






