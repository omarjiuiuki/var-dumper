
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import React, { useState ,useEffect} from "react";
import '../styles/gestion_pfe.css';
import CircularProgress from "../../../components/circle_progression_bar";

import MyPieChart from '../../../components/diagramme_secteur';

function GestionPFE(){



// TODO : recuperer les pfes depuis la base de donnés puis les metre dans ue varialbe dans le fichier data 

const [activePfe,setActivePfe] = useState('');


const mes_pfe = [
  {
    id: 1,
    intitul_projet:
      "Gestion de PFE hhdudhu dhfuhd fuhfuh dfuhdfu dhfuhd fuhduf hdks odosk dosk do sdk",
    description: "Projet pour gérer les PFE",
    option: "GL",
    type_projet: "Classique",
    date_soutenance: "13/06/2025",
    status: "valide",
  },
  {
    id: 2,
    intitul_projet: "Gestion de PFE avec un suivi rigoureux des étapes et des livrables.",
    description: "Application pour gérer les projets de fin d'études.",
    option: "GL",
    type_projet: "Classique",
    date_soutenance: "13/06/2025",
    status: "valide",
  },
  {
    id: 3,
    intitul_projet: "Application e-commerce pour les petites entreprises.",
    description: "Plateforme permettant la gestion des ventes en ligne.",
    option: "SI",
    type_projet: "Innovant",
    date_soutenance: "22/07/2025",
    status: "en attente",
  },
  {
    id: 4,
    intitul_projet: "Système de gestion d'une bibliothèque universitaire.",
    description: "Projet pour automatiser le prêt et le retour des livres.",
    option: "BD",
    type_projet: "Classique",
    date_soutenance: "01/09/2025",
    status: "refuse",
  },
  {
    id: 5,
    intitul_projet:
      "Développement d'une application mobile pour le suivi des activités sportives.",
    description: "Projet pour aider les utilisateurs à suivre leurs performances sportives.",
    option: "SI",
    type_projet: "Innovant",
    date_soutenance: "15/10/2025",
    status: "valide",
  },
  {
    id: 6,
    intitul_projet: "Système de gestion des stocks pour les commerces de détail.",
    description: "Application pour optimiser la gestion et le réapprovisionnement des produits.",
    option: "GL",
    type_projet: "Classique",
    date_soutenance: "05/11/2025",
    status: "en attente",
  },
  {
    id: 7,
    intitul_projet: "Plateforme collaborative pour la gestion des projets en entreprise.",
    description: "Outil permettant aux équipes de collaborer et de suivre leurs tâches.",
    option: "BD",
    type_projet: "Innovant",
    date_soutenance: "20/12/2025",
    status: "refuse",
  },
  {
    id: 8,
    intitul_projet: "Application de réservation de rendez-vous médicaux en ligne.",
    description: "Plateforme facilitant la prise de rendez-vous avec des médecins.",
    option: "SI",
    type_projet: "Innovant",
    date_soutenance: "10/01/2026",
    status: "valide",
  },
  {
    id: 9,
    intitul_projet: "Application de réservation de rendez-vous médicaux en ligne.",
    description: "Plateforme facilitant la prise de rendez-vous avec des médecins.",
    option: "SI",
    type_projet: "Innovant",
    date_soutenance: "10/01/2026",
    status: "valide",
  },
  {
    id: 10,
    intitul_projet: "Système de gestion de la logistique des stocks dans un entrepôt.",
    description:
      "Application permettant de suivre les stocks et les entrées/sorties de produits.",
    option: "GL",
    type_projet: "Classique",
    date_soutenance: "15/02/2026",
    status: "en attente",
  },
  {
    id: 11,
    intitul_projet: "Plateforme de gestion des tâches et des projets en entreprise.",
    description: "Application permettant aux équipes de suivre les tâches et les deadlines.",
    option: "BD",
    type_projet: "Innovant",
    date_soutenance: "25/03/2026",
    status: "refuse",
  },
  {
    id: 12,
    intitul_projet: "Application mobile pour la gestion des rendez-vous et de l’agenda.",
    description: "Plateforme permettant aux utilisateurs de gérer leurs rendez-vous et tâches.",
    option: "SI",
    type_projet: "Innovant",
    date_soutenance: "30/04/2026",
    status: "valide",
  },
  {
    id: 13,
    intitul_projet:
      "Application de gestion des inscriptions et des événements universitaires.",
    description: "Outil pour gérer les événements, les inscriptions, et les plannings.",
    option: "GL",
    type_projet: "Classique",
    date_soutenance: "10/05/2026",
    status: "en attente",
  },
  {
    id: 14,
    intitul_projet:
      "Système de gestion des prêts et des retours de matériel dans une bibliothèque.",
    description: "Application pour automatiser le prêt et le retour des ressources matérielles.",
    option: "BD",
    type_projet: "Innovant",
    date_soutenance: "01/06/2026",
    status: "refuse",
  },
  {
    id: 15,
    intitul_projet:
      "Plateforme d'analyse des données d'entreprise pour la prise de décision.",
    description:
      "Outil pour analyser les performances d'une entreprise et prendre des décisions stratégiques.",
    option: "SI",
    type_projet: "Innovant",
    date_soutenance: "20/07/2026",
    status: "valide",
  },
];



useEffect(() => {
  setNivColor(); // Met à jour la couleur à chaque changement
}, [mes_pfe]); // Déclenche l'exécution à chaque modification de `mes_pfe`




//----------------------------------------------------------------------------------------
//------------------------------diagramme secteur-----------------------------------------

const data = [
  { name: 'Validé', value: 40 },
  { name: 'En Attente', value: 30 },
  { name: 'Refusé', value: 30 },
  
];

const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];
/*
const MyPieChart = () => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={150}
      fill="#8884d8"
      label
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);

*/





const [detailShow,setDetailShow] = useState(false);



const [color,setColor]=useState('');

const [selectedStatus,setSelactedStatus] = useState('tous');

 const handleStatus = (status) => {
    setSelactedStatus(status);
 }

 const setNivColor = () => {
  const percentage = countNbPValide(); // Éviter de recalculer plusieurs fois
  if (percentage < 30) {
    setColor('red');
  } else if (percentage >= 30 && percentage < 70) {
    setColor('orange');
  } else {
    setColor('green');
  }
};

 const countNbPValide = () => {
  const nbPValide = mes_pfe.filter((pfe) => pfe.status === 'valide').length;
  const percentage = (nbPValide / mes_pfe.length) * 100;
  return percentage.toFixed(2); // Limite à 2 chiffres après la virgule
};



return (
  <>
    <div className="main-gestion-pfe">
      <div className="main-content-pfe">
        <div className="container-header">
          <div className="side-bare-tool">
            <ul>
              <li
                className={selectedStatus === "tous" ? "active-status" : ""}
                onClick={() => handleStatus("tous")}
              >
                Tous
              </li>
              <li
                className={selectedStatus === "valide" ? "active-status" : ""}
                onClick={() => handleStatus("valide")}
              >
                Projet validé
              </li>
              <li
                className={selectedStatus === "en attente" ? "active-status" : ""}
                onClick={() => handleStatus("en attente")}
              >
                Projet en attente
              </li>
              <li
                className={selectedStatus === "refuse" ? "active-status" : ""}
                onClick={() => handleStatus("refuse")}
              >
                Projet refusé
              </li>
            </ul>
          </div>

          <header className={detailShow ? "head-gestion-pfe-visible" : "head-gestion-pfe"}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Détails</h1>
              <button>Enregistrer</button>
            </div>
            <div className="head-gestion-action-pfe">
              <div className="">
                <h2 style={{ paddingBottom: "15px" }}>Détails Thème </h2>

                <form action="">
                  <label>Description</label>
                  <textarea
                    rows="4"
                    placeholder="Description du projet..."
                    maxlength={500}
                    value={activePfe.description}
                  ></textarea>
                  <label>Type</label>
                  <input type="text" value={activePfe.type_projet} />
                  <label>Option</label>
                  <input type="text" value={activePfe.option} />

                  <label>Date Soutenance</label>
                  <input type="text" value={activePfe.date_soutenance} />
                  <label>Etudiant 1</label>
                  <input type="text" />

                  <label>Etudiant 2</label>
                  <input type="text" />
                </form>
              </div>

              <div>
                <h2 style={{ paddingBottom: "15px" }}>Détails Encadrant </h2>
                {/* // ! mettre les deux dans le meme forme ou voir autre solution  */}
                <form action="">
                  <label>Encadrant</label>
                  <input type="text" />
                  <label>Co-Encadrant</label>
                  <input type="text" />
                </form>
              </div>
            </div>
          </header>
        </div>
        <div className="table-pfe">
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>intitule Thème</th>
                <th>Description</th>
                <th>Option</th>
                <th>Type Du PFE</th>
                <th>Date Soutenance</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {mes_pfe
                .filter(
                  (entrer) =>
                    selectedStatus === "tous" ||
                    entrer.status === selectedStatus
                )
                .map((entrer, index) => (
                  <tr
                    key={entrer.id}
                    onDoubleClick={() => {
                      setDetailShow(true);
                      setActivePfe(entrer); // Met à jour le PFE actif
                      console.log(entrer); // Affiche la ligne sélectionnée dans la console
                      // window.scrollTo({ top: 0,left :0, behavior: "smooth" }); // Défilement vers le haut
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{entrer.intitul_projet}</td>
                    <td>{entrer.description}</td>
                    <td>{entrer.option}</td>
                    <td>{entrer.type_projet}</td>
                    <td>{entrer.date_soutenance}</td>
                    <td>{entrer.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="foot-gestion-pfe">
          <CircularProgress percentage={countNbPValide()} color={color} />
          {console.log(countNbPValide())}
          nombre de projet valider
          <div>section ajout de projet en cas d'urgence</div>
          <div>section de import export donnés et statistique</div>
        </div>
        <div>{MyPieChart(data, COLORS)}</div>
      </div>
    </div>
  </>
);

}

export default GestionPFE;