import React, { useRef, useEffect,useState } from 'react';
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
    const [selectedType,setSelactedType] = useState('pfe');
    const [selectedMembre,setSelectedMembre] = useState('tous');
    const list_membre = [
      { tous: 'Tous' },
      { etudiant: 'Etudiant' },
      { enseignant: 'Enseignant' },
      { entreprise: 'Contact Entreprise' },
    ];


    const handleStatus = (status) => {
        setSelactedType(status);
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
      // Remplacer <br> par des retours à la ligne (\n)
      textHTML = textHTML.replace(/<br>/g, "\n");
    
      // Remplacer &nbsp; par des espaces
      textHTML = textHTML.replace(/&nbsp;/g, " ");
    
      return textHTML;
    };
    


    useEffect(() => {
      // Load initial email content if it exists
      if (dataEmail?.[1]?.email?.contenue) {
        setEmailContent(dataEmail[1].email.contenue);
      }
    }, [dataEmail]);
  
    const handleChange = (e) => {
      setEmailContent(e.target.value); // Update the state
      setText(e.target.value); 
    };
  





  return (
    <>
      <div className="page-email">
        <div className="head-envoi-email">
          <div className="template-area">
            <ul>
              <li
                className={selectedType === "pfe" ? "active-status" : ""}
                onClick={() => handleStatus("pfe")}
              >
                Email Proposition PFE &nbsp;&nbsp;
                <MdArrowForwardIos style={{ transform: "rotate(90deg)" }} />
              </li>

              <li
                className={
                  selectedType === "encadremant" ? "active-status" : ""
                }
                onClick={() => handleStatus("encadremant")}
              >
                Email Proposition Encadrement &nbsp;&nbsp;
                <MdArrowForwardIos style={{ transform: "rotate(90deg)" }} />
              </li>

              <li
                className={selectedType === "stage" ? "active-status" : ""}
                onClick={() => handleStatus("stage")}
              >
                Email Proposition Stage &nbsp;&nbsp;
                <MdArrowForwardIos style={{ transform: "rotate(90deg)" }} />
              </li>
              <li
                className={selectedType === "choix" ? "active-status" : ""}
                onClick={() => handleStatus("choix")}
              >
                Email Appel A Choix &nbsp;&nbsp;
                <MdArrowForwardIos style={{ transform: "rotate(90deg)" }} />
              </li>
            </ul>
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
          */}

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
          */}

          <div className="container-email-modif">
            <h1>Éditeur d'email</h1>
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
            */}
            <button>Envoyer</button>
          </div>

          

         {/* <div>
            <table>
              <thead>
                <tr>
                  <th>Type email</th>
                  <th>Contenue</th>
                </tr>
              </thead>

              {dataEmail.map((entry, index) => {
                const contenue = entry.email.contenue;
                return (
                  <tbody>
                    <tr key={index}>
                      <td>{entry.email.type_email} </td>
                      <td>{contenue}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>

            */}

        </div>
      </div>
    </>
  );

}
export default EvoieConfigEmail;










/*


  
  
*/