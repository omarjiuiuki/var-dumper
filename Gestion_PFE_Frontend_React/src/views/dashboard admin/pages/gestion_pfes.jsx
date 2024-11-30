

import React from "react";
import '../styles/gestion_pfe.css';
import CircularProgress from "../../../components/circle_progression_bar";

function GestionPFE(){

return (
  <>
    <div className="main-gestion-pfe">
     {/* <div className="side-bare-tool">
        <ul>
          <li>All</li>
          <li>projet valide</li>
          <li>proposition</li>
          <li>refus</li>
        </ul>
      </div>
     */}

      <div className="main-content-pfe">
      <div className="container-header">
      <div className="side-bare-tool">
        <ul>
          <li>Tous</li>
          <li>Projet validé</li>
          <li>Projet en attente</li>
          <li>Projet refusé</li>
        </ul>
      </div>
        <header className="head-gestion-pfe">
          <h1>Détails</h1>

          <div className="head-gestion-action-pfe">
            <div className="">
              <h2>Détails Thème </h2>
              <form action="">
                <div className="form-niv-1">
                <div>
                 <textarea name="" id=""  
                    rows="4" 
                     placeholder="Description du projet..."
                     maxlength="500"></textarea>
                <input type="text" />
                <input type="text" />
                 </div>
                 <div>
                
                <input type="text" />
                <input type="text" />
                 </div>
                </div>
              </form>
            </div> 

            <div>
              <h2>Détails Encadrant </h2>  {/* // ! mettre les deux dans le meme forme ou voir autre solution  */}
              <form action="">
                <input type="text" />
                <input type="text" />
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
              <tr>
                <td>1</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>2</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>1</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>2</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>1</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>2</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>1</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>2</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>1</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>2</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>1</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>

              <tr>
                <td>2</td>
                <td>gestion de pfe</td>
                <td>projet pour gerer les pfe</td>
                <td>GL</td>
                <td>Classique</td>
                <td>13/06/2025</td>
                <td>valider</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="foot-gestion-pfe">
           
          <CircularProgress percentage={65} color={"#e67e22"} />
          nombre de projet valider
          <div>section ajout de projet en cas d'urgence</div>
          <div>section de import export donnés et statistique</div>
        </div>
      </div>
    </div>
  </>
);

}

export default GestionPFE;