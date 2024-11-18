
class Etudiant {
  /* dans chaque model  on doit mettre les noms des d'attribut 
   comme les nom des attribut de la BDD pour eviter des problemes */

    constructor(intitule_option_master1,moyenne_m1) {
      this.intitule_option_master1 = intitule_option_master1;
      this.moyenne_m1 = moyenne_m1;
    }
  
    getMoyenneM1() {
      return this.moyenne_m1;
    }
  
    setMoyenneM1(nouveauMoyenneM1) {
      this.moyenne_m1 = nouveauMoyenneM1;
    }



    getIntituleOption() {
        return this.intitule_option_master1;
      }
    
      setIntituleOption(nouveauIntituleOption) {
        this.intitule_option_master1 = nouveauIntituleOption;
      }


     
     
    
  }
  
  export default Etudiant;
  