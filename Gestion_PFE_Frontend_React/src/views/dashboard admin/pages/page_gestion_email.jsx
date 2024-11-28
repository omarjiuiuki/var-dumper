import React, { useState } from "react";
import CircularProgress from "../../../components/circle_progression_bar";
import '../styles/page_gestion_email.css';
import UlNavigation from "../../../components/my_ul_navigation_list";
import { Link } from "react-router-dom";



function PageGestionEmail (){

  const [isSelected,setSelected]=useState(false);
  const [isSelected2,setSelected2]=useState(false);

  return (
    <div className="gestion-email">
      <header className="header-email-page">
        <div
          className="email-type-template"
          onClick={() => {
              setSelected(true);
            }}
          onMouseLeave={() => {
            setSelected(false);
          }} >
          Email Template
          {isSelected ? (
            <ul>
              <li>
                <Link to={''}>appel a proposition</Link>
              
              </li>
              <li>
              <Link to={''}>appel a encadrement</Link>
               
              </li>
              <li>
              <Link to={''}>appel a proposition de stage</Link>
          
              </li>
            </ul>
          ) : null}
        </div>

        <div
          className="email-type-control"
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
                <Link to={`${window.location.pathname}/ajouter?type-email=proposition-pfe`}>Email de proposition PFE</Link>
              </li>
              <li>
              <Link to={`${window.location.pathname}/ajouter?type-email=proposition-encadrement`}>Email de proposition Encadrement</Link>
              </li>
              <li>
              <Link to={`${window.location.pathname}/ajouter?type-email=proposition-stage`}>Email de proposition Stage</Link>
              </li>
            </ul>
          ) : null}
        </div>


      </header>

      <div className="header-email">
        <div>
          <CircularProgress percentage={35} color={"red"} />
          <p>Proposition PFE soumise</p>
        </div>
        <div>
          <CircularProgress percentage={65} color={"orange"} />
          <p>Proposition encadrement soumise</p>
        </div>
        <div>
          <CircularProgress percentage={100} color={"green"} />
          <p>Proposition soumise</p>
        </div>
      </div>

      <main className="email-main-part">
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