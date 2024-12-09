
class Enseignant {
    /* dans chaque model  on doit mettre les noms des d'attribut 
     comme les nom des attribut de la BDD pour eviter des problemes */
  
      constructor(grade,date_recrutement) {
        this.grade = grade;
        this.date_recrutement = date_recrutement;
      }
    
      getDateRecrutement() {
        return this.date_recrutement;
      }
    
      setDateRecrutement(nouveauDateRecrutement) {
        this.date_recrutement = nouveauDateRecrutement;
      }
  
  
  
      getGrade() {
          return this.grade;
        }
      
        setGrade(nouveauGrade) {
          this.grade = nouveauGrade;
        }
  
  
       
       
      
    }
    
    export default Enseignant;
    