

import React, { useState, useEffect } from 'react';

import { MdOutlineEmail, MdArrowForwardIos, MdOutlineArrowDropDown } from 'react-icons/md';
import MyCardTemplate from '../../../components/card_template';
import '../styles/page_envoi_config_email.css';
const EvoieConfigEmail = () => {
    const [emails, setEmails] = useState([]); // Liste des e-mails
    const [selectedEmail, setSelectedEmail] = useState(null); // E-mail sélectionné pour modification
    const [updatedContent, setUpdatedContent] = useState(""); // Contenu mis à jour
    const [updatedNom, setUpdatedNom] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    // Fonction pour récupérer les e-mails
    const fetchEmails = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/email-template');
            const data = await response.json();
            setEmails(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des e-mails:", error);
        }
    };

    // Fonction appelée à la première montée du composant
    useEffect(() => {
        fetchEmails();
    }, []);

    // Fonction pour sélectionner un e-mail
    const handleSelectEmail = (email) => {
       
        setSelectedEmail(email);
        setUpdatedContent(email.contenue); // Pré-remplit le formulaire avec le contenu existant
        setUpdatedNom(email.nom_email);
        setUpdatedDescription(email.description_email);
      };

    // Fonction pour enregistrer les modifications
    const handleSave = async () => {
        if (!selectedEmail) return;

        const updatedEmail = {
            id: selectedEmail.id,
            contenue: updatedContent,
            nom_email: updatedNom,
            description_email: updatedDescription,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/modif-email', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmail),
            });

            if (response.ok) {
                alert("E-mail mis à jour avec succès !");
                fetchEmails(); // Recharge les e-mails pour refléter la modification
                setSelectedEmail(null); // Réinitialise la sélection
            } else {
                alert("Erreur lors de la mise à jour de l'e-mail.");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
        }
    };















    return (
      <>
        <div className="page-email-main">
          <div
            className={
              selectedEmail
                ? "container-emails-left-min"
                : "container-emails-left-max"
            }
          >
            <div>
              <h1 className="page-title">
                <MdOutlineEmail style={{ marginRight: "10px" }} /> Gestion des
                Templates
              </h1>
            </div>
            <div className="cards-container">
              {emails.map((email) => {
                console.log(selectedEmail?.id === email.id); // Affiche dans la console si l'email est sélectionné
                return (
                  <MyCardTemplate
                    key={email.id}
                    titre={email.nom_email}
                    description={email.description_email}
                    onClick={() => handleSelectEmail(email)} // La fonction qui gère la sélection
                    isSelected={selectedEmail?.id === email.id} // Passer un prop pour indiquer si cet email est sélectionné
                  />
                );
              })}
            </div>
          </div>

          {/* Formulaire de modification */}
          {selectedEmail ? (
            <div className="modifier-template-right-max">
              <button id="arrow-close" onClick={() => setSelectedEmail(null)}>
                <MdArrowForwardIos />
              </button>
              <h2>Modifier le template</h2>

              <p>Nom Template :</p>
              <input
                type="text"
                value={updatedNom || "Chargement..."}
                onChange={(e) => setUpdatedNom(e.target.value)}
              />

              <p>Description :</p>
              <textarea
                className="auto-expand"
                rows={1} // Hauteur initiale : 1 ligne
                maxLength={150} // Limite du nombre total de caractères (optionnel)
                value={updatedDescription || "Chargement..."}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />

              <p>Contenue :</p>
              <textarea
                className="email-area"
                value={updatedContent || "Chargement..."}
                onChange={(e) => setUpdatedContent(e.target.value)}
                rows={5}
                style={{ width: "100%" }}
              ></textarea>
              <br />
              <div id="action-area">
                <button onClick={() => setSelectedEmail(null)}>Annuler</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {selectedEmail.contenue !== updatedContent ||
                selectedEmail.nom_email !== updatedNom ||
                selectedEmail.description_email !== updatedDescription ? (
                  <button onClick={handleSave}>Enregistrer</button>
                ) : (
                  <button
                  style={{ pointerEvents: "none", opacity: 0.5 }}
                    disabled
                  >
                    Enregistrer
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="modifier-template-right-min"></div>
          )}
        </div>
      </>
    );
};

export default EvoieConfigEmail;















/*import React, { useRef, useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { MdArrowDropDown, MdArrowForwardIos, MdOutlineArrowDropDown } from 'react-icons/md';
import { useSearchParams } from "react-router-dom";
import '../styles/page_envoi_config_email.css';
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowDownShortWide } from 'react-icons/fa6';
import UseFetchEmailTemplate from '../../../data/email_template_data';

import { Editor } from '@tinymce/tinymce-react';


function EvoieConfigEmail(){
    
  

  const [searchParams] = useSearchParams();
    const parametre = searchParams.get("type-email"); 

    const { dataEmail , loading} = UseFetchEmailTemplate();
    const [text, setText] = useState("");
    const [emailContent, setEmailContent] = useState("");
    const [selectedContenue,setSelectedContenue] = useState('');
    const [selectedType,setSelactedType] = useState('proposition_pfe');
    const [selectedMembre,setSelectedMembre] = useState('tous');
    const [emailID, setEmailID] = useState(null);
    const list_membre = [
      { tous: 'Tous' },
      { etudiant: 'Etudiant' },
      { enseignant: 'Enseignant' },
      { entreprise: 'Contact Entreprise' },
    ];
   

    const navigate = useNavigate();

    const refreshPage = () => {
        navigate(0); // Recharge la page actuelle
    };
    useEffect(() => {
      if (dataEmail.length > 0) {
        handleTypeEmail('proposition_pfe'); // Charger le premier type d'email
      }
       
       console.log(`email contennt ${typeof emailContent}`);
    }, [dataEmail]);
  

 

   const handleTypeEmail = (email) => {
        setSelactedType(email);

const  matchingEntry = dataEmail?.find((entry) => entry.type_email === email);

          

    if (!matchingEntry) {
      setEmailContent('Chargement...'); // Si aucun type correspondant n'est trouvé
      setEmailID(null);
    }
        
        setEmailContent(matchingEntry.contenue);
        setEmailID(matchingEntry.id);
  

       
  } 
    
   

    const convertToHTML = (text) => {
     // Remplacer les retours à la ligne par <br>
  text = text.replace(/\n/g, "<br>");

  // Remplacer plusieurs espaces par &nbsp; (si vous souhaitez conserver les espaces)
  text = text.replace(/ {2,}/g, (match) => '&nbsp;'.repeat(match.length)); // Remplacer plusieurs espaces

  // Ou, si vous voulez remplacer tous les espaces simples par &nbsp;
  // text = text.replace(/ /g, "&nbsp;");

  return text;
    };


    const convertFromHTML = (textHTML) => {
      if(typeof textHTML != 'string'){
        return '';
      }
      // Remplacer <br> par des retours à la ligne (\n)
      textHTML = textHTML.replace(/<br>/g, "\n");
    
      // Remplacer &nbsp; par des espaces
      textHTML = textHTML.replace(/&nbsp;/g, " ");
    
      return textHTML;
    };
    


 
    const handleChange = (e) => {
      setEmailContent(e.target.value); // Update the state
      setText(e.target.value); 
    };
  



  // pour modifier le template de l'email
    const handleUpdateEmailContent = async (e) => {
        e.preventDefault();
        const updatedValue = { id:emailID,contenue: emailContent};
        try {
            const response = await fetch('http://127.0.0.1:8000/api/modif-email', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(updatedValue),
            });

            if (response.ok) {
              alert("Email modified successfully");
              refreshPage();
         
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while modifing the email .');
        }
    };

  return (
    <>
      <div className="page-email">
        <div className="head-envoi-email">
          <div className="template-area">
          {["proposition_pfe", "proposition_encadrement", "proposition_stage", "appel_choix"].map((type) => (
            <ul>
                <li key={type} 
                 className={selectedType === type ? "active-status" : ""}
                onClick={() => handleTypeEmail(type)}>

                {type.charAt(0).toUpperCase() + type.slice(1)} &nbsp;&nbsp;
                <MdArrowForwardIos style={{ transform: "rotate(90deg)" }} />
                </li>
            </ul>
          
       
          ))}

           {/* <ul>
              <li
                className={
                  selectedType === "proposition_pfe" ? "active-status" : ""
                }
                onClick={() => handleTypeEmail("proposition_pfe")}
              >
                Email Proposition PFE &nbsp;&nbsp;
                <MdArrowForwardIos style={{ transform: "rotate(90deg)" }} />
              </li>

              <li
                className={
                  selectedType === "proposition_encadrement"
                    ? "active-status"
                    : ""
                }
                onClick={() => handleTypeEmail("proposition_encadrement")}
              >
                Email Proposition Encadrement &nbsp;&nbsp;
                <MdArrowForwardIos style={{ transform: "rotate(90deg)" }} />
              </li>

              <li
                className={
                  selectedType === "proposition_stage" ? "active-status" : ""
                }
                onClick={() => handleTypeEmail("proposition_stage")}
              >
                Email Proposition Stage &nbsp;&nbsp;
                <MdArrowForwardIos style={{ transform: "rotate(90deg)" }} />
              </li>
              <li
                className={
                  selectedType === "appel_choix" ? "active-status" : ""
                }
                onClick={() => handleTypeEmail("appel_choix")}
              >
                Email Appel A Choix &nbsp;&nbsp;
                <MdArrowForwardIos style={{ transform: "rotate(90deg)" }} />
              </li>
            </ul>*//*}
          </div>
        </div>

        <div className="content-envoi-email">
          {/* <div className="container-head">
            <label>Envoyer à </label>
            <select
              value={selectedMembre}
              onChange={(e) => setSelectedMembre(e.target.value)}
            >
              {list_membre.map((entry, index) => {
                const [value, label] = Object.entries(entry)[0]; // Récupère clé et valeur
                return (
                  <option key={index} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
          *//*}

          {/*  <div className="info-date">
            <div>
              <label>Date Début </label>
              <input type="date" />
            </div>

            <div>
              <label>Date Fin </label>
              <input type="date" />
            </div>
          </div>
          *//*}

          <div className="container-email-modif">
            <h1>Éditeur d'email  {emailID}</h1>
          
              <textarea
                className="email-area"
                value={convertFromHTML(emailContent)} // Affiche le contenu brut
                onChange={handleChange} // Met à jour le contenu
              ></textarea>
          

            {/* <h2>Affichage formaté :</h2>
            <div
              className="formatted-content"
              dangerouslySetInnerHTML={{ __html: convertToHTML(emailContent) }} // Interprète les balises HTML puis le stocker avec le html
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            ></div>
            *//*}
            <button onClick={handleUpdateEmailContent}>Enregistrer</button>
          </div>

          { <div>
            <table>
              <thead>
                <tr>
                <th>id</th>
                  <th>Type email</th>
                  <th>Contenue</th>
                </tr>
              </thead>

              {dataEmail.map((entry, index) => {
                const contenue = entry.contenue;
                return (
                  <tbody>
                    <tr key={index}>
                      <td>{entry.id} </td>
                      <td>{entry.type_email} </td>
                      <td>{contenue}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>

            }
        </div>
      </div>
    </>
  );

}
export default EvoieConfigEmail;



*/






/*


  
  
*/