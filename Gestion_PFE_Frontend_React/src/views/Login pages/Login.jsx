import  React, { useState } from 'react';
 import { Link,  } from 'react-router-dom';
import DashboardEtudiantMain from '../dashboard_etudiant/dashboard_etudiant_main';
import DashboardEnseignantMain from '../dashboard enseignant/dashboard_enseignant_main';
import DashboardEnterpriseMain from '../dashboard entreprise/dashboard_entreprise_main';
import DashboardAdminMain from '../dashboard admin/pages/dashboard_admin_main';
import './login.css';


function Login() {

  const [userType, setUserType] = useState("");

  const typeUtilisateur = (e) => {
    const value = e.target.value.toLowerCase(); // Rendre insensible à la casse
    if (value === "etudiant") {
      setUserType("etudiant");
    } else if (value === "enseignant") {
      setUserType("enseignant");
    } else if (value === "entreprise") {
      setUserType("entreprise");
    } else if (value === "admin") {
      setUserType("admin");
    } else {
      setUserType(""); // Réinitialise en cas de saisie invalide
    }
  };

  const setTypeUser = () => {
    if (userType === "etudiant") {
      return <DashboardEtudiantMain />;
    } else if (userType === "enseignant") {
      return <DashboardEnseignantMain />;
    } else if (userType === "entreprise") {
      return <DashboardEnterpriseMain />;
    } else if (userType === "admin") {
      return <DashboardAdminMain />;
    } else {
      return null;
    }
  };

  return userType ? (
    setTypeUser()
  ) : (
    <div className="container-login-page">
      <h1>Connexion</h1>
      <p>
        Bienvenue! Veuillez saisir vos informations.
      </p>
   
   
      <div className="container-input">
        <div>
          <label>Email</label>
          <input
            name="email"
            className="email-input"
            placeholder="Entrez votre email..."
            onChange={typeUtilisateur}
          />
        </div>
        <div>
          <label >Mot de passe</label>
          <input
            className="pwd-input"
            type="password"
            placeholder="Entrez votre mot de passe..."
          />
        </div>

        <div className="se-souvenir">
          <div>
            <input type="checkbox" id="remember" />
            <label>
              Se Souvenir de moi
            </label>
          </div>

          <button>
            Mot de passe oublié
          </button>
        </div>
        <div className="connection-boutton-container">
          <button
            onClick={() => alert("Connexion simulée !")}
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;