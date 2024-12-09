 import React, { useEffect, useState } from "react";
 import { useSearchParams } from "react-router-dom";
 import '../styles/detail_page_pfe.css';
 import UseFetchThemePfe from "../../../data/theme_pfe_data";
import { ClipLoader } from "react-spinners";
 import Modal from "../../../components/modal_dialogue";
  
function DetailPagePfe(){
    const [searchParams] = useSearchParams();
    const parametre = searchParams.get("id"); 
  const [motifRefue,setMotifRefue]=useState('');
  const [refueArea,setRefueArea]=useState(false);
  
    const { dataTheme , loading} = UseFetchThemePfe();
    const activePfe = dataTheme.find((pfe) => pfe.id == parametre ); /*// ?parametre n'est pas correcte voir prk ==> 
                                                                       // ! reponse:  la comparaison par '===' est remplacer par '==' */
     

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handleConfirm = () => {
      alert('Action confirmée!');
      closeModal();
    };


    const [isModal2Open, setIsModal2Open] = useState(false);

    const openModal2 = () => setIsModal2Open(true);
    const closeModal2 = () => setIsModal2Open(false);
  
    const handleConfirm2 = () => {
      alert('Action confirmée!');
      closeModal2();
    };


/* //!ici pour la validation du projet */
    
    const handleValidation = async () => {
      const updatedValue = { id:parametre,est_valider: "valide" }; // Remplacez par vos données
    
      try {
        const response = await fetch("http://localhost:8000/api/validation", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify(updatedValue),
        });
        closeModal();
        if (response.ok) {
          const data = await response.json();
          alert('projet valider avec succée !');
          
          console.log("Mise à jour réussie :", data);
        } else {
          console.error("Erreur lors de la mise à jour :", response.statusText);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    



    /* //!ici pour le refue du projet */

    const handleRefue = async () => {
         setRefueArea(true);
      if (!motifRefue.trim()) {
        alert('Veuillez remplir le motife de refus.');
        return;
      }

      const updatedValue = { id:parametre,est_valider: "refuse",motif:motifRefue}; // Remplacez par vos données
    
      try {
        const response = await fetch("http://localhost:8000/api/refue", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify(updatedValue),
        });
        closeModal2();
        if (response.ok) {
          const data = await response.json();
          alert('projet refuser avec succée !');
         
          console.log("Mise à jour réussie :", data);
        } else {
          console.error("Erreur lors de la mise à jour :", response.statusText);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    
    

    if (!activePfe) {
        console.log(activePfe);
        return(<>
            <div className="loading-indicator">
             <ClipLoader color="#00BFFF" loading={true} size={40} />
              <p>Chargement...</p>
            </div>
            </>
            );    
      }

      if (dataTheme.length == 0) {
        console.log(activePfe);
        return <h1>Le projet n'a pas été trouvé. pour id {parametre}</h1>;  
      }

      const handleEtatChange = (newEtat) => {
        activePfe.est_valider = newEtat; 
      };

      const handleMotifRefueChange = (e) => {
        setMotifRefue(e.target.value);
      };
      
  const getEtatColor = (Etat) => {
    if (Etat =='refuse') return "red";
    if (Etat =='en_attente') return "orange";
    return "green";
  };

    return (
      <>



<div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Confirmez votre action"
        message="Êtes-vous sûr de vouloir valider le projet ?"
        onConfirm={handleValidation}
        confirmText="Confirmer"
        cancelText="Annuler"
      />
      <Modal
        isOpen={isModal2Open}
        onClose={closeModal2}
        title="Confirmez votre action"
        message={ 
           <div  id="form-group-refue" className="form-group">
          <label>Motife de refue</label>
            <textarea
              className="technologies-area"
              onChange={handleMotifRefueChange}
            />
        </div>}
        onConfirm={handleRefue}
        confirmText="Confirmer"
        cancelText="Annuler"
      />
    </div>

        {/*//? container racine de la page */}
        <div className="section-pfe-detail">
          <h1 className="titre-page">Projet ID: {parametre}</h1>

          {/*//! section de detail  */}
          <div className="section-detail-page">
            <h1>Détails du Projet</h1>

            <form className="details-form-page">
              {/*//? section de detail concernant le pfe */}
              <div className="detail-pfe-page">
                <div className="form-group">
                  <label>Intitulé du projet</label>
                  <input type="text" value={activePfe.intitule_pfe} readOnly />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="description-area-page"
                    rows="4"
                    value={activePfe.description}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Type du projet</label>
                  <input type="text" value={activePfe.type_pfe} readOnly />
                </div>
                <div className="form-group">
                  <label>Option</label>
                  <input type="text" value={activePfe.option} readOnly />
                </div>
                <div className="form-group">
                  <label>Date de Soutenance</label>
                  <input
                    type="date"
                    value={activePfe.date_soutenance || "vide..."}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Technologies Utilisées</label>
                  <textarea
                    className="technologies-area"
                    value={activePfe.technologie || "vide..."}
                    readOnly
                  />
                </div>
              </div>

              {/*//? section de detail concernant les participants */}
              <div className="detail-participant">
                <h1>Participants</h1>
                <div id="list-etudiant" className="form-group">
                  <label>Etudiants participants</label>
                  <ul>
                    <li>
                      1.&nbsp;&nbsp;&nbsp;{activePfe.etudiant_1_id || "vide..."}
                    </li>
                    <li>
                      2.&nbsp;&nbsp;&nbsp;{activePfe.etudiant_2_id || "vide..."}
                    </li>
                  </ul>
                </div>
                <div className="form-group">
                  <label>Encadrant</label>
                  <input
                    type="text"
                    value={activePfe.encadrant || "vide..."}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Co-Encadrant</label>
                  <input
                    type="text"
                    value={activePfe.encadrant || "vide..."}
                    readOnly
                  />
                </div>
              </div>

              {/*//? section de detail concernant l'etat du projet */}
              <div className="form-group">
                <label>État du projet</label>

                <input
                  type="text"
                  value={activePfe.est_valider}
                  style={{
                    color: getEtatColor(activePfe.est_valider),
                    fontWeight: "bold",
                  }}
                  readOnly
                />
              </div>
              {/* // ! voir comment changer le status */}

             { refueArea ?(
              <div className="form-group">
                <label>Motife de refue</label>
                {activePfe.est_valider == "refuse" ? (
                 
                   <textarea
                    className="technologies-area"
                    value={activePfe.motif_refue || 'vide...'}
                    readOnly
                  />
                ) : (
                  <textarea
                    className="technologies-area"
                    onChange={handleMotifRefueChange}
                  />
                )}
              </div>
             ) :(
               null
             )}
             
              
            </form>
            <div className="action-container">  
               <button onClick={openModal}>Valider</button>
               <button onClick={openModal2}>Refuser</button>
            </div>
          </div>
        </div>
      </>
    );
}
export default DetailPagePfe;

/*

   <>
        <div className="section-pfe-detail">
        <h1>{parametre}</h1>
       <h1>hello</h1>
       <div className="section-detail">
          <h2>Détails du Projet</h2>
          <form>
            <label>Description</label>
            <textarea className="description-area" rows="4" value={activePfe.description} readOnly />
            <label>Type</label>
            <input type="text" value={activePfe.type_projet} readOnly />
            <label>Option</label>
            <input type="text" value={activePfe.option} readOnly  />
            <label>Date Soutenance</label>
            <input type="text" value={activePfe.date_soutenance} readOnly />
          </form>
        </div>
        </div>
       </>
*/