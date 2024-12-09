import { useState, useEffect } from "react";
import EmailTemplate from "../models/Email_template";

const UseFetchEmailTemplate = () => {
  const [dataEmail, setDataEmail] = useState([]);
  const [loading, setLoading] = useState(true);
 
  


  
  useEffect(() => {
    // Récupération des données
    fetch('http://localhost:8000/api/email-template')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const emailData = data.map(item => ({
          email: new EmailTemplate(item.type_email,item.contenue)
        }));
        setDataEmail(emailData);
          });
        
       
        setLoading(false);
    
  }, []);






  return {
    dataEmail,
    loading,
   // Expose handleSearchChange for the search input
  };
};

export default UseFetchEmailTemplate;
