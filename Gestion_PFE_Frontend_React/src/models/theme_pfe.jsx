
class ThemePfe {
    /* dans chaque model  on doit mettre les noms des d'attribut 
     comme les nom des attribut de la BDD pour eviter des problemes */
  
      constructor(id,intitule_pfe,type_pfe,description,option,est_valider) {
        this.id = id;
        this.intitule_pfe = intitule_pfe;
        this.type_pfe = type_pfe;
        this.description = description;
        this.option = option;
        this.est_valider = est_valider;
      }
    
      getIntitulePfe() {
        return this.intitule_pfe;
      }
    
      setIntitulePfe(nouveauIntitulePfe){
        this.intitule_pfe = nouveauIntitulePfe;
      }
  
  
  
      getTypePfe() {
          return this.type_pfe;
        }
      
        setTypePfe(nouveauTypePfe) {
          this.type_pfe = nouveauTypePfe;
        }
  


        getDescription() {
            return this.description;
          }
        
          setDescription(nouveauDescription) {
            this.description = nouveauDescription;
          }
  



          getOption() {
            return this.option;
          }
        
          setOption(nouveauOption) {
            this.option = nouveauOption;
          }
    


       
          getStatus() {
            return this.est_valider;
          }
        
          setStatus(nouveauStatus) {
            this.est_valider = nouveauStatus;
          }
     
      
    }
    
    export default ThemePfe;
    