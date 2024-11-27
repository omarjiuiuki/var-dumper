// src/controllers/EtudiantController.js
import Utilisateur from "../models/utilisateur";

class UtilisateurController {
  constructor() {
    // Initialisation avec un étudiant par défaut
    this.utilisateur = new Utilisateur('Doe', 'John', 'john.doe@example.com', 'Informatique', 15.5);
  }

  // Méthode pour récupérer toutes les informations de l'étudiant
  getEtudiantDetails() {
    return {
      nom: this.utilisateur.getNom(),
      prenom: this.utilisateur.getPrenom(),
      email: this.utilisateur.getEmail(),
      intitule_option: this.utilisateur.getIntituleOption(),
      moyenne_m1: this.utilisateur.getMoyenneM1(),
    };
  }

  // Méthodes pour modifier les attributs de l'étudiant
  setNom(nom) {
    this.utilisateur.setNom(nom);
  }

  setPrenom(prenom) {
    this.utilisateur.setPrenom(prenom);
  }

  setEmail(email) {
    this.utilisateur.setEmail(email);
  }

  setTypeUtilisateur(type) {
    this.utilisateur.setTypeUtilisateur(type);
  }

}

export default UtilisateurController;
