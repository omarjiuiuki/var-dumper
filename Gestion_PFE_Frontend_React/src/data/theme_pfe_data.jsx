import { useState, useEffect } from "react";
import ThemePfe from "../models/theme_pfe";



const UseFetchThemePfe = () => {
  const [dataTheme, setDataTheme] = useState([]);
  const [loading, setLoading] = useState(true);
 
  


  
  useEffect(() => {
    // Récupération des données
    fetch('http://localhost:8000/api/theme_detail')
      .then(response => response.json())
      .then(data => {
        console.log(data);
     
         // Mettez les données directement sans les transformer en instances de ThemePfe
         setDataTheme(data);
     
      /*  const themeData = data.map(item => ({
          theme: new ThemePfe(item.id,item.intitule_pfe,item.type_pfe,item.description,item.option,item.est_valider)
        }));
        setDataTheme(themeData);*/
          });
        
       
        setLoading(false);
    
  }, []);






  return {
    dataTheme,
    loading,
   // Expose handleSearchChange for the search input
  };
};

export default UseFetchThemePfe;
