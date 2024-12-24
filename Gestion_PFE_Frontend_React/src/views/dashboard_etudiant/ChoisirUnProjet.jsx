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
    axios
      .get(`http://localhost:8000/api/projects/${etudiantId}`)
      .then((response) => {
        setTeacherProjects(response.data.teacher_projects);
        setCompanyProjects(response.data.company_projects);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des projets :", error);
      });
  }, [etudiantId]);

  const handleProjectChange = (projectName) => {
    if (
      selectedProjects.length < 10 &&
      !selectedProjects.includes(projectName)
    ) {
      setSelectedProjects([...selectedProjects, projectName]);
    }
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

  const showDetails = (project) => {
    setDetailedProject(project);
  };

  const closeDetails = () => {
    setDetailedProject(null);
  };

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
        <h1  className="text-5xl font-bold text-center text-[#2c3e50] p-4 ">Choisir un Projet :</h1>
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

      {viewSelected && (
        <div className="view-project-selected-etu">
          <h3>Projets sélectionnés :</h3>
          <ul>
            {selectedProjects.map((project, index) => (
              <li key={index}>
                {index + 1}. {project}
                <button
                  onClick={() => handleRemoveProject(project)}
                  style={{ color: "red", marginLeft: "10px" }}
                >
                  Supprimer
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
<td></td>


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
                  {!selectedProjects.includes(project.intitule_pfe) ? (
                    <button
                      onClick={() => handleProjectChange(project.intitule_pfe)}
                      style={{ marginLeft: "10px" }}
                    >
                      Sélectionner
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveProject(project.intitule_pfe)}
                      style={{ color: "red", marginLeft: "10px" }}
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
                  {!selectedProjects.includes(project.intitule_pfe) ? (
                    <button
                      onClick={() => handleProjectChange(project.intitule_pfe)}
                      style={{ marginLeft: "10px" }}
                    >
                      Sélectionner
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveProject(project.intitule_pfe)}
                      style={{ color: "red", marginLeft: "10px" }}
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

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
    </div>
    </>
  );
};

export default ChoisirUnProjet;













