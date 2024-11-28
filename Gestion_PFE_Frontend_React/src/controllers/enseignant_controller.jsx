// src/controllers/EtudiantController.js
import Enseignant from "../models/enseignant";

class EnseignantController {
  constructor() {
    // Initialisation avec un étudiant par défaut
    this.enseignant = new Enseignant('Docteur', 11/10/2015);
  }

  // Méthode pour récupérer toutes les informations de l'étudiant
  getEnseignantDetails() {
    return {
      grade: this.enseignant.getGrade(),
      date_recrutement: this.enseignant.getDateRecrutement(),
    };
  }

  // Méthodes pour modifier les attributs de l'étudiant
  setGrade(grade) {
    this.enseignant.setGrade(grade);
  }

  setDateRecrutement(DateRec) {
    this.enseignant.setDateRecrutement(DateRec);
  }

 

  
}

export default EnseignantController;
