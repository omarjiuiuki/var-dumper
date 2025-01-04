import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import "./ChoisirUnProjet.css";

const ChoisirUnProjet = ({ etudiantId }) => {
  const [teacherProjects, setTeacherProjects] = useState([]);
  const [companyProjects, setCompanyProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [viewSelected, setViewSelected] = useState(false);
  const [message, setMessage] = useState("");
  const [detailedProject, setDetailedProject] = useState(null); // Projet sélectionné pour affichage des détails

  useEffect(() => {
    // Faire les deux requêtes en parallèle avec Promise.all pour attendre les deux résultats
    axios
      .all([
        axios.get(`http://localhost:8000/api/projects/${etudiantId}`),
        axios.get(`http://localhost:8000/api/choix-pfe/${etudiantId}`)
      ])
      .then(
        axios.spread((projectsResponse, selectedProjectsResponse) => {
          // Récupérer les projets des enseignants et des entreprises
          setTeacherProjects(projectsResponse.data.teacher_projects);
          setCompanyProjects(projectsResponse.data.company_projects);
  
          // Récupérer les projets sélectionnés avec leur priorité
          if (selectedProjectsResponse.data.selected_projects) {
            setSelectedProjects(
              selectedProjectsResponse.data.selected_projects.map((project) => ({
                ...project,
                nbr_choix: project.nbr_choix, // Assurez-vous que la priorité est bien récupérée
              }))
            );
  
            // Si l'étudiant a déjà sélectionné 10 projets, afficher directement les projets choisis
            if (selectedProjectsResponse.data.selected_projects.length === 10) {
              setViewSelected(true); // Afficher directement les projets sélectionnés
            }
          }
        })
      )
      .catch((error) => {
        //console.error("Erreur lors du chargement des projets :", error);
      });
  }, [etudiantId]);
  
  
  
  
  const handleRemoveProject = (projectId) => {
    setSelectedProjects(
      selectedProjects.filter((project) => project.id !== projectId)
    );
  };
  
  
  
  

 
  const showDetails = (project) => {
    setDetailedProject(project);
  };

  const closeDetails = () => {
    setDetailedProject(null);
  };
  
// Gérer le remplacement d'un projet sélectionné
const handleReplaceChoice = (oldProjectId, newProjectId) => {
  const newProject = [...teacherProjects, ...companyProjects].find(
    (project) => project.id === newProjectId
  );

  if (!newProject) {
    alert("Le projet sélectionné n'existe pas.");
    return;
  }

  // Remplacer le projet dans la liste des projets sélectionnés
  setSelectedProjects((prevSelected) =>
    prevSelected.map((choice) =>
      choice.id === oldProjectId
        ? { ...choice, id: newProject.id, intitule_pfe: newProject.intitule_pfe, nbr_choix: choice.nbr_choix }
        : choice
    )
  );

  // Mettez à jour l'API pour refléter ce changement
  axios
    .put(`http://localhost:8000/api/choix-pfe/replace/${oldProjectId}`, {
      new_theme_pfe_id: newProject.id,
      etudiant_1_id: etudiantId,
    })
    .catch((error) => {
      console.error("Erreur lors du remplacement du projet :", error);
    });
};

const handleModifyChoicePriority = (projectId, newPriority) => {

  

  // Mise à jour locale de la priorité
  setSelectedProjects((prevSelected) =>
    prevSelected.map((choice) =>
      choice.id === projectId ? { ...choice, nbr_choix: newPriority } : choice
    )
  );

  // Mise à jour dans la base de données via l'API
  axios
    .put(`http://localhost:8000/api/choix-pfe/${projectId}`, {
      nbr_choix: newPriority,
    })
    .then(() => {
      console.log("Priorité mise à jour avec succès !");
    })
    .catch((error) => {
      console.error("Erreur lors de la modification de la priorité :", error);
    });
};


const handleProjectChange = (projectName, projectId) => {
  // Vérifiez si l'étudiant a déjà 10 projets sélectionnés
  if (selectedProjects.length >= 10) {
    alert("Vous avez déjà sélectionné 10 projets. Vous ne pouvez pas en ajouter d'autres.");
    return;
  }

  // Vérifiez si le projet est déjà sélectionné
  if (selectedProjects.some((project) => project.id === projectId)) {
    alert("Ce projet a déjà été sélectionné.");
    return;
  }

  // Ajoutez le projet si ce n'est pas encore sélectionné
  handleAddChoice(projectId);
};



const handleRemoveChoice = (projectId) => {
  axios
    .delete(`http://localhost:8000/api/choix-pfe/${projectId}`)
    .then(() => {
      setSelectedProjects((prevSelected) =>
        prevSelected.filter((choice) => choice.id !== projectId)
      );
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression du choix :", error);
    });
};


const handleSubmit = (e) => {
  e.preventDefault();
  setMessage(
    `Vous avez choisi les projets suivants : ${selectedProjects
      .map((project) => project.intitule_pfe)
      .join(", ")}`
  );
};

const handleViewToggle = () => {
  setViewSelected(!viewSelected);
};
  
  
  
  
  
  const handleModifyChoice = (projectId, newNbrChoix) => {
    axios
      .put(`http://localhost:8000/api/choix-pfe/${projectId}`, {
        nbr_choix: newNbrChoix,
      })
      .then(() => {
        setSelectedProjects((prevSelected) =>
          prevSelected.map((choice) =>
            choice.id === projectId ? { ...choice, nbr_choix: newNbrChoix } : choice
          )
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du choix :", error);
      });
  };
  
 

  
  
  
  
  
  
  



  
  const handleAddChoice = (projectId) => {
    if (selectedProjects.length >= 10) {
      alert("Vous ne pouvez sélectionner que 10 projets maximum.");
      return;
    }
  
    const project = [...teacherProjects, ...companyProjects].find(
      (p) => p.id === projectId
    );
  
    if (!project) return;
  
    const newNbrChoix = selectedProjects.length + 1; // Prochaine priorité
  
    axios
      .post("http://localhost:8000/api/choix-pfe", {
        theme_pfe_id: projectId,
        etudiant_1_id: etudiantId,
        nbr_choix: newNbrChoix,
      })
      .then(() => {
        setSelectedProjects([
          ...selectedProjects,
          { id: projectId, nbr_choix: newNbrChoix, intitule_pfe: project.intitule_pfe },
        ]);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du choix :", error);
      });
  };
  
 
  
  
/*
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
  };*/

  if (detailedProject) {
    // Vue des détails du projet
    return (
      <div className="project-details-page">
        <button className="close-modal" onClick={closeDetails}>
          <FaArrowLeft /> Retour
        </button>
        <h2>Détails du projet</h2>
        <p><strong>Nom :</strong> {detailedProject.intitule_pfe}</p>
        <p><strong>Résumé :</strong> {detailedProject.description}</p>
        <p><strong>Technologies :</strong> {detailedProject.technologies}</p>
        <p><strong>Besoins Matériel :</strong> {detailedProject.materials}</p>
      </div>
    );
  }

  return (
   
  <>
    <div className="choisir-projet-etu">
      <div className="choix-projet-header-etu">
        <h1 className="text-5xl font-bold text-center text-[#2c3e50] p-4">
          Choisir un Projet :
        </h1>
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

      {viewSelected && selectedProjects.length > 0 && (
  <div className="view-project-selected-etu">
    <h3>Projets sélectionnés :</h3>
    <ul>
      {selectedProjects.map((choice) => (
        <li key={choice.id}>
          {choice.nbr_choix}. {choice.intitule_pfe} (Priorité : {choice.nbr_choix})
          <select
  value={choice.nbr_choix}
  onChange={(e) => handleModifyChoicePriority(choice.id, parseInt(e.target.value))}
>
  {Array.from({ length: 10 }, (_, i) => i + 1).map((priority) => (
    <option key={priority} value={priority}>
      {priority}
    </option>
  ))}
</select>

          <button
            onClick={() => handleRemoveChoice(choice.id)}
            style={{
              color: "red",
              marginLeft: "10px",
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            Supprimer
          </button>
          <button
            onClick={() => handleReplaceChoice(choice.id, "newProjectId")} // Remplacer par un ID de projet existant
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              backgroundColor: "#f39c12",
              color: "white",
            }}
          >
            Remplacer par
          </button>
        </li>
      ))}
    </ul>
  </div>
)}









      <div className="projet-list-etu">
        <div className="titre-tab-choix-etu">
          <h2>Projets proposés par les enseignants :</h2>
        </div>
        <div className="tab-choix-projet-etu">
          <table>
            <thead>
              <tr>
                <th>Encadrant</th>
                <th>co-encadrant</th>
                <th>Option</th>
                <th>Résumé</th>
                <th>Type de sujet</th>
                <th>Intitulé du PFE</th>
                <th>Technologies utilisées</th>
                <th>Besoins matériel</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teacherProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.encadrant?.utilisateur?.nom || "N/A"}</td>
                  <td>{/* Vous pouvez ajouter un champ pour le co-encadrant */}</td>
                  <td>{project.option}</td>
                  <td>{project.description}</td>
                  <td>{project.type_pfe}</td>
                  <td>{project.intitule_pfe}</td>
                  <td>{project.technologies}</td>
                  <td>{project.materials}</td>
                  <td>
                    <button onClick={() => showDetails(project)}>
                      Détail
                    </button>
                    {!selectedProjects.some((choice) => choice.id === project.id) ? (
                      <button
                        onClick={() => handleProjectChange(project.intitule_pfe, project.id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Sélectionner
                      </button>
                    ) : (
                      <button
                        disabled
                        style={{
                          marginLeft: "10px",
                          cursor: "not-allowed",
                          backgroundColor: "#ccc",
                          color: "#666",
                        }}
                      >
                        Déjà sélectionné
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveProject(project.intitule_pfe)}
                      style={{ color: "red", marginLeft: "10px" }}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="projet-list-etu">
        <div className="titre-tab-choix-etu">
          <h2>Projets proposés par les entreprises :</h2>
        </div>
        <div className="tab-choix-projet-etu">
          <table>
            <thead>
              <tr>
                <th>Nom de l'entreprise</th>
                <th>Option</th>
                <th>Intitulé du PFE</th>
                <th>Résumé</th>
                <th>Technologies</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companyProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.contact_entreprise?.utilisateur?.nom || "N/A"}</td>
                  <td>{project.option}</td>
                  <td>{project.intitule_pfe}</td>
                  <td>{project.description}</td>
                  <td>{project.technologies}</td>
                  <td>
                    <button onClick={() => showDetails(project)}>
                      Détail
                    </button>
                    {!selectedProjects.some((choice) => choice.id === project.id) ? (
                      <button
                        onClick={() => handleProjectChange(project.intitule_pfe, project.id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Sélectionner
                      </button>
                    ) : (
                      <button
                        disabled
                        style={{
                          marginLeft: "10px",
                          cursor: "not-allowed",
                          backgroundColor: "#ccc",
                          color: "#666",
                        }}
                      >
                        Déjà sélectionné
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveChoice(choice.id)}
                      style={{
                        color: "red",
                        marginLeft: "10px",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                      }}
                    >
                      Supprimer
                    </button>
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













