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
        console.log(data); // Vérifie bien les données ici
        setDataEmail(data); // Mets à jour les données
        setLoading(false); // Mets à jour loading une fois que les données sont récupérées
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        setLoading(false); // Même en cas d'erreur, mettez à jour loading
      });
  }, []);

  return { dataEmail, loading };
};

export default UseFetchEmailTemplate;
