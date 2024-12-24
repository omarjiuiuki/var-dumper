import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AfficherProjetChoisi.css";

// Exemple de style pour afficher les projets de l'étudiant avec la couleur selon l'état
const getStatusStyle = (status) => {
  switch (status) {
    case "valide":
      return { color: "green" };
    case "refuse":
      return { color: "red" };
    case "en_attente":
      return { color: "orange" };
    default:
      return { color: "gray" };
  }
};

const AfficherProjetChoisi = ({ etudiantId }) => {
  const [projet, setProjet] = useState(null);

  useEffect(() => {
    const fetchProjetDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/projet/etudiant/${etudiantId}/details`
        );
        // Afficher la réponse de l'API dans la console pour vérifier sa structure
        console.log("Réponse de l'API:", response.data);

        setProjet(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du projet", error);
      }
    };

    if (etudiantId) {
      fetchProjetDetails();
    }
  }, [etudiantId]);

  if (!projet) return <p>Chargement...</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 className="text-5xl font-bold text-center text-[#2c3e50] p-4">
          État de projet :
        </h1>
      </div>

      <table
        className="projet-table"
        style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid black",
                padding: "12px",
                backgroundColor: "#34495e",
                color: "white",
              }}
            >
              Nom du Projet
            </th>
            <th
              style={{
                border: "1px solid black",
                padding: "12px",
                backgroundColor: "#34495e",
                color: "white",
              }}
            >
              État
            </th>
          </tr>
        </thead>
        <tbody>
          <tr key={projet.id}>
            <td style={{ border: "1px solid black", padding: "12px" }}>
              {projet.intitule_pfe || "Non disponible"}
            </td>
            <td
              style={{
                ...getStatusStyle(projet.est_valider),
                border: "1px solid black", // Ajout de la bordure noire
                padding: "12px", // Optionnel pour ajouter du padding
              }}
            >
              {projet.est_valider === "valide"
                ? "Validé"
                : projet.est_valider === "refuse"
                ? "Refusé"
                : projet.est_valider === "en_attente"
                ? "En attente"
                : "Non défini"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AfficherProjetChoisi;




