
class Utilisateur {

   /* dans chaque model  on doit mettre les noms des d'attribut 
   comme les nom des attribut de la BDD pour eviter des problemes */

    constructor(nom,prenom,email,type_utilisateur) {
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.type_utilisateur = type_utilisateur;
     
    }
  
    getNom() {
      return this.nom;
    }
  
    setNom(nouveauNom) {
      this.nom = nouveauNom;
    }



    getPrenom() {
        return this.prenom;
      }
    
      setPrenom(nouveauPrenom) {
        this.prenom = nouveauPrenom;
      }




      getEmail() {
        return this.email;
      }
    
      setEmail(nouveauEmail) {
        this.email = nouveauEmail;
      }




      getTypeUtilisateur() {
        return this.type_utilisateur;
      }
    
      setTypeUtilisateur(nouveauTypeUtilisateur) {
        this.type_utilisateur = nouveauTypeUtilisateur;
      }



    
  }
  
  export default Utilisateur;
  