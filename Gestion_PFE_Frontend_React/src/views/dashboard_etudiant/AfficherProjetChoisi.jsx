import React from "react";
import "./AfficherProjetChoisi.css";

const projetsEtudiant = [
  {
    id: 1,
    name: "Développement d'une application mobile",
    status: "Validé", // Validé, Rejeté, En attente, Demande de compléments
  },
  {
    id: 2,
    name: "Analyse de données massives",
    status: "En attente",
  },
  {
    id: 3,
    name: "Optimisation des performances d'un algorithme",
    status: "Rejeté",
  },
  {
    id: 4,
    name: "Détection d'anomalies dans un réseau",
    status: "Demande de compléments",
  },
];

const AfficherProjetChoisi = () => {



  const getStatusStyle = (status) => {
    switch (status) {
      case "Validé":
        return { color: "green" };
      case "Rejeté":
        return { color: "red" };
      case "En attente":
        return { color: "orange" };
      case "Demande de compléments":
        return { color: "blue" };
      default:
        return { color: "gray" };
    }
  };

  return (
    <>
      <div className="head-affiche-projet-etu">
        <div className="titre-etat-projet-etu">
          <h1>état de projet :</h1>
        </div>

        <div className="table-etat-projet-etu">
          <table className="projet-table">
            <thead>
              <tr>
                <th>Nom du Projet</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              {projetsEtudiant.map((projet) => (
                <tr key={projet.id}>
                  <td>{projet.name}</td>

                  <td style={getStatusStyle(projet.status)}>
                    {projet.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AfficherProjetChoisi;