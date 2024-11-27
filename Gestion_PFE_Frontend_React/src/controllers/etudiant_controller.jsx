// src/controllers/EtudiantController.js
import Etudiant from "../models/etudiant";

class EtudiantController {
  constructor() {
    // Initialisation avec un étudiant par défaut
    this.etudiant = new Etudiant('GL', 15.5);
  }

  // Méthode pour récupérer toutes les informations de l'étudiant
  getEtudiantDetails() {
    return {
      intitule_option_master1: this.etudiant.getIntituleOption(),
      moyenne_m1: this.etudiant.getMoyenneM1(),
    };
  }

  // Méthodes pour modifier les attributs de l'étudiant
  setIntituleOption(IntituleOption) {
    this.etudiant.setIntituleOption(IntituleOption);
  }

  setMoyenneM1(MoyenneM1) {
    this.etudiant.setMoyenneM1(MoyenneM1);
  }

 

  
}

export default EtudiantController;
