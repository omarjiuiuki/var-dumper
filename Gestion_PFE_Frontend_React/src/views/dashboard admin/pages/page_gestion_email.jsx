import React, { useState } from "react";
import CircularProgress from "../../../components/circle_progression_bar";
import '../styles/page_gestion_email.css';
import UlNavigation from "../../../components/my_ul_navigation_list";
import { Link } from "react-router-dom";
import { MdOutlineEmail, MdArrowForwardIos, MdOutlineArrowDropDown } from 'react-icons/md';
import DateCloture from "./date_cloture";

function PageGestionEmail (){

  const [isSelected,setSelected]=useState(false);
  const [isSelected2,setSelected2]=useState(false);








  const calculatePercentPfeStatus = () => {
    const validCount = dataTheme.filter((pfe) => pfe.est_valider === "valide").length;
    return ((validCount / dataTheme.length) * 100).toFixed(2);
  };

  const getPercentageColor = (percentage) => {
    if (percentage < 30) return "red";
    if (percentage < 70) return "orange";
    return "green";
  };






  return (
    <div className="gestion-email">
      <header className="header-email-page">
        <div id="title-area">
          <h1 className="title-container">
            <MdOutlineEmail style={{ marginRight: "10px" }} /> Gestion Des Emails  
           
          </h1>
         
        </div>
       
        <div className="email-type-template">
          <Link
            to={`${window.location.pathname}/configuration?type-email=proposition-encadrement`}
          >
            {" "}
            Email Template
          </Link>
        </div>
        {/*<div
          className="email-template-configue"
          onClick={() => {
              setSelected2(true);
            }}
          onMouseLeave={() => {
            setSelected2(false);
          }}>
          Gestion Des Emails
          {isSelected2 ? (
            <ul>
              <li>
               { //!pour les parametre dans l'url      <Link to={`${window.location.pathname}/configuration?type-email=proposition-pfe`}>Email de proposition PFE</Link>}
              </li>
              <li>
              <Link to={`${window.location.pathname}/configuration?type-email=proposition-encadrement`}>Email de proposition Encadrement</Link>
              </li>
              <li>
              <Link to={`${window.location.pathname}/configuration?type-email=proposition-stage`}>Email de proposition Stage</Link>
              </li>
            </ul>
          ) : null}
        </div>
        */}
      </header>

     {/* <div className="header-email">
        <div className="progress-item">
          <CircularProgress percentage={65} color="red" />
          <p>Proposition PFE soumise</p>
        </div>
        <div className="progress-item">
          <CircularProgress percentage={25} color="orange" />
          <p>Proposition encadrement soumise</p>
        </div>
        <div className="progress-item">
          <CircularProgress percentage={100} color="green" />
          <p>Proposition soumise</p>
        </div>
      </div>*/}

      <main className="email-main-part">

        <div className="date-cloture">
        <DateCloture />
        </div>


        <div className="non-proposition">
          <div className="titre-section">
            Attente De Proposition :<button>voir plus</button>
          </div>
          <ul>
            {/*
              //?ici on recupere les la list des user qui n'ont pas soumis les proposition de Pfe
              */}
            <li>
              <div className="contenue-section">
                <p> 1 - Susane Lebeau </p>
                <p>GL</p>
                <p>description : pas soumie de pfe</p>
              </div>
            </li>

            <li>
              <div className="contenue-section">
                <p> 1 - Susane Lebeau </p>
                <p>GL</p>
                <p>description : pas soumie de pfe</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="email-template">
          <div className="titre-section">
            Attente De Proposition :<button>voir plus</button>
          </div>
          <ul>
            {/*
              //?ici on recupere les la list des user qui n'ont pas soumis les proposition de Pfe
              */}
            <li>
              <div className="contenue-section">
                <p> 1 - Susane Lebeau </p>
                <p>GL</p>
                <p>description : pas soumie de pfe</p>
              </div>
            </li>

            <li>
              <div className="contenue-section">
                <p> 1 - Susane Lebeau </p>
                <p>GL</p>
                <p>description : pas soumie de pfe</p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default PageGestionEmail;