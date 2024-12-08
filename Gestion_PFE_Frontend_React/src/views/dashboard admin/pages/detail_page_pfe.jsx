 import React, { useEffect } from "react";
 import { useSearchParams } from "react-router-dom";

 import UseFetchThemePfe from "../../../data/theme_pfe_data";


  
function DetailPagePfe(){
    const [searchParams] = useSearchParams();
    const parametre = searchParams.get("id"); 

  
    const { dataTheme , loading} = UseFetchThemePfe();
    const activePfe = dataTheme.find((pfe) => pfe.id == parametre ); /*// ?parametre n'est pas correcte voir prk ==> 
                                                                       // ! reponse:  la comparaison par '===' est remplacer par '==' */
     
   


    if (!activePfe) {
        console.log(activePfe);
        return <h1>Le projet n'a pas été trouvé. pour id {parametre}</h1>;
     
      }

    return (
       <>
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
       </>
    );
}
export default DetailPagePfe;