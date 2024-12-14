
class EmailTemplate {
    /* dans chaque model  on doit mettre les noms des d'attribut 
     comme les nom des attribut de la BDD pour eviter des problemes */
  
      constructor(id,type_email,contenue) {
        this.id = id;
        this.type_email = type_email;
        this.contenue = contenue;
      }
      getId() {
        return this.id;
      }
    
    


      getTypeEmail() {
        return this.type_email;
      }
    
      setTypeEmail(nouveauTypeEmail) {
        this.type_email = nouveauTypeEmail;
      }
  
  
  
      getContenue() {
          return this.contenue;
        }
      
        setContenue(nouveauContenue) {
          this.contenue = nouveauContenue;
        }
  
  
       
       
      
    }
    
    export default EmailTemplate;
    