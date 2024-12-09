// src/models/Proposal.js
class Proposal {
  constructor(title, type, options, description, materials) { // Ajout de 'materials'
      this.title = title;
      this.type = type;
      this.options = options;
      this.description = description;
      this.materials = materials; // Initialisation du champ 'materials'
  }
}

export default Proposal;