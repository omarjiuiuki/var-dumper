// src/controllers/ProposalController.js
import Proposal from '../models/proposal';

class ProposalController {
    constructor() {
        this.proposals = [];
    }

    addProposal(title, type, materials, description, submissionDeadline) { // Ajout de 'materials'
        const currentDate = new Date();
        const deadlineDate = new Date(submissionDeadline);

        // Check if the submission date is exceeded
        if (deadlineDate < currentDate) {
            throw new Error("La date de soumission est dépassée. Vous ne pouvez pas ajouter de proposition.");
        }

        const newProposal = new Proposal(title, type, materials, description); // Inclure 'materials'
        this.proposals.push(newProposal);
    }

    updateProposal(index, title, type, materials, description) { // Ajout de 'materials'
        if (this.proposals[index]) {
            this.proposals[index] = new Proposal(title, type, materials, description); // Inclure 'materials'
        }
    }

    removeProposal(index) {
        // Créez un nouveau tableau excluant la proposition à l'index spécifié
        this.proposals = this.proposals.filter((_, i) => i !== index);
    }

    getProposals() {
        return this.proposals;
    }
}

const proposalController = new ProposalController();
export default proposalController;