// src/controllers/ProposalController.js
import Proposal from '../models/proposal';

class ProposalController {
    constructor() {
        this.proposals = [];
    }

    addProposal(title,type, options, description, submissionDeadline) {
        const currentDate = new Date();
        const deadlineDate = new Date(submissionDeadline);

        // Check if the submission date is exceeded
        if (deadlineDate < currentDate) {
            throw new Error("La date de soumission est dépassée. Vous ne pouvez pas ajouter de proposition.");
        }

        const newProposal = new Proposal(title,type, options, description);
        this.proposals.push(newProposal);
    }

    updateProposal(index, title, type, options, description) {
        if(this.proposals[index]) {
       this.proposals[index] = new Proposal (title,type, options, description);
    }}
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