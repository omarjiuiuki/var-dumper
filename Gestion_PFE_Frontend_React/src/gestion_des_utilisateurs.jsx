// first_page.jsx


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen, FaTrash } from 'react-icons/fa';
import './gestion_des_utilisateurs.css';
import AfficheEtu from './views/dashboard admin/view_etudiant.jsx';
import papa from 'papaparse';

function PageGestionUtilisateur() {


  
   const [activeTypeUtilisateur, setActivePage] = useState("Etudiant");

  const typeUtilisateur = {
    "Etudiant": <h2>Etudiant</h2>,
    "Enseignant": <h2>Enseignant</h2>,
    "Entreprise": <h2>Entreprise</h2>,
   };


  const [UtilisateurtDetails, setDetails] = useState([]);

  const [fichierCsvDetails, setFichierCsvDetails] = useState([]);

  // Effect to fetch data when the component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/affiche-utilisateurs')
      .then(response => {
        console.log(response.data);
        setDetails(response.data); // Store the fetched data in the state
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  }, []); // Empty dependency array ensures it runs only once





  const HandleCsvFile = (e) => {
    const file = e.target.files[0];
    papa.parse(file, {
      header: true,
      complete: (result) => {
        setFichierCsvDetails(result.data);
      }
    });
  };

 /*
 
   ici faire la meme chose que dashboard admin un systeme de routage pour
    les different user etudian,ensaignant...

    pour avoir le chemin utilisateur/etudiant ...
 */



  const setTypeUtilisateur = () => {
      if(activeTypeUtilisateur === 'Etudiant'){
        return <AfficheEtu/>
      }else if(activeTypeUtilisateur === 'Enseignant'){
        //return <AfficheEns/>
        return typeUtilisateur[1];
      }else{
         //return <AfficheEntreprise/>
         return typeUtilisateur[2];
      }
    
  };

  const afficheCsv = () => {
    if (activeTypeUtilisateur === 'Etudiant') {
      return fichierCsvDetails.length ? (
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Intitulé option</th>
              <th>Moyenne master 1</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fichierCsvDetails.filter((student) => student.Nom && student.Prenom && student.Option && student.Moyenne)
              .map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.Nom}</td>
                  <td>{student.Prenom}</td>
                  <td>{student.Email}</td>
                  <td>{student.Option}</td>
                  <td>{student.Moyenne}</td>
                  <td>
                    <button
                      style={{ width: '50%' }}
                      onClick={() => {
                        if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
                          setFichierCsvDetails((prevDetails) => prevDetails.filter((_, i) => i !== index));
                        }
                      }}
                    >
                      <FaPen />
                    </button>
                    <button
                      style={{ width: '50%' }}
                      onClick={() => {
                        if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
                          setFichierCsvDetails((prevDetails) => prevDetails.filter((_, i) => i !== index));
                        }
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null;
    } else if (activeTypeUtilisateur === 'Enseignant') {
      return fichierCsvDetails.length ? (
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Grade</th>
              <th>Date de recrutement</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fichierCsvDetails.filter((enseignant) => enseignant.Nom && enseignant.Prenom && enseignant.Email && enseignant.Grade && enseignant.DateRec)
              .map((enseignant, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={enseignant.Nom}
                      onChange={(e) => {
                        const updatedEnseignant = { ...enseignant, Nom: e.target.value };
                        setFichierCsvDetails((prevDetails) => {
                          const updatedDetails = [...prevDetails];
                          updatedDetails[index] = updatedEnseignant;
                          return updatedDetails;
                        });
                      }}
                    />
                  </td>
                  <td>{enseignant.Prenom}</td>
                  <td>{enseignant.Email}</td>
                  <td>{enseignant.Grade}</td>
                  <td>{enseignant.DateRec}</td>
                  <td>
                    <button
                      style={{ width: '100%' }}
                      onClick={() => {
                        if (window.confirm('Voulez-vous vraiment supprimer cet enseignant ?')) {
                          setFichierCsvDetails((prevDetails) => prevDetails.filter((_, i) => i !== index));
                        }
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null;
    } else {
      return fichierCsvDetails.length ? (
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Dénomination de l'entreprise</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fichierCsvDetails.filter((entreprise) => entreprise.Nom && entreprise.Prenom && entreprise.Email && entreprise.DenominationEnt)
              .map((entreprise, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entreprise.Nom}</td>
                  <td>{entreprise.Prenom}</td>
                  <td>{entreprise.Email}</td>
                  <td>{entreprise.DenominationEnt}</td>
                  <td>
                    <button
                      style={{ width: '100%' }}
                      onClick={() => {
                        if (window.confirm('Voulez-vous vraiment supprimer cet enseignant ?')) {
                          setFichierCsvDetails((prevDetails) => prevDetails.filter((_, i) => i !== index));
                        }
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null;
    }
  };

  return (
    <>
    <div className='header-Users'>
 
        <nav className='navigation-user'>
              <ul>
                 {Object.keys(typeUtilisateur).map((typeUtilisateur) => (
                  <li  
                     className={activeTypeUtilisateur === typeUtilisateur?'active-type-user':''} 
                     key={typeUtilisateur} 
                     onClick={() => setActivePage(typeUtilisateur)}>
                     {typeUtilisateur}
                  </li>
                ))}
             </ul>
        </nav>

        <div>
        <input type='file' accept='.csv' onChange={HandleCsvFile}/> 

         <div>
         
         </div>    
       </div>
    

    </div>

    <div className='addUsers'>
      
      
        {setTypeUtilisateur()}
    
    </div>
    <div className='tableField' >
             
            {afficheCsv()}
    </div>
    </>
  );









/*



  function afficheCsv(){
   
    if(activeTypeUtilisateur === 'Etudiant'){
      return (fichierCsvDetails.length) ? (
           <table>
                 <thead>
                    <tr>
                       <th>N°</th>
                       <th>Nom</th>
                       <th>Prénom</th>
                       <th>Email</th>
                       <th>Intitulé option</th>
                       <th>Moyenne master 1</th>
                       <th></th>
                     </tr>
                 </thead>
                
                 <tbody>
                    {fichierCsvDetails.filter((student) => student.Nom && student.Prenom && student.Option && student.Moyenne)
                            .map((student, index) => (
                       <tr key={index}>
                          <td>{index+1}</td>
                          <td>{student.Nom}</td>
                          <td>{student.Prenom}</td>
                          <td>{student.Email}</td>
                          <td>{student.Option}</td>
                          <td>{student.Moyenne}</td>
                          <td > <button style={{
                             width : '50%',
                             
                          }}
                          onClick={() => {
                            if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
                               // Supprimer l'enseignant sélectionné par son index
                              setUtilisateur((prevUtilisateur) =>
                                prevUtilisateur.filter((_, i) => i !== index)
                              );
                            }
                          }}
                          ><FaPen/></button>
                          <button style={{
                             width : '50%',
                              
                          }}
                          onClick={() => {
                            if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
                               // Supprimer l'enseignant sélectionné par son index
                              setUtilisateur((prevUtilisateur) =>
                                prevUtilisateur.filter((_, i) => i !== index)
                              );
                            }
                          }}
                          ><FaTrash/></button>
                           </td>
                       </tr>
                    ))}
                 </tbody>
              </table>)
              
              :  null;
    
   }else if(activeTypeUtilisateur === 'Enseignant'){
      return  fichierCsvDetails.length ? (
              <table>
                 <thead>
                    <tr>
                       <th>N°</th>
                       <th>Nom</th>
                       <th>Prénom</th>
                       <th>Email</th>
                       <th>Grade</th>
                       <th>Date de recrutement</th>
                       <th></th>
                     </tr>
                 </thead>
                
                 <tbody>
                    {fichierCsvDetails.filter((enseignant) => enseignant.Nom && enseignant.Prenom && enseignant.Email && enseignant.Grade && enseignant.DateRec)
                            .map((enseignant, index) => (
                       <tr key={index}>
                          <td>{index+1}</td>
                          <td> <input type="text"  value={enseignant.Nom}  
                                   onChange={(e) => {
                                      // Mettez à jour l'état de l'objet `enseignant` avec la nouvelle valeur
                                       setEnseignant((prevEnseignant) => ({
                                       ...enseignant,Nom: e.target.value,
                                        }));  
                                       }} />  </td>
                          <td>{enseignant.Prenom}</td>
                          <td>{enseignant.Email}</td>
                          <td>{enseignant.Grade}</td>
                          <td>{enseignant.DateRec}</td>
                          <td > <button 
                                style={{
                                  width : '100%'
                               }} 
                               onClick={() => {
                                  if (window.confirm('Voulez-vous vraiment supprimer cet entreprise ?')) {
                                     // Supprimer l'enseignant sélectionné par son index
                                    setUtilisateur((prevUtilisateur) =>
                                      prevUtilisateur.filter((_, i) => i !== index)
                                    );
                                  }
                                }}
                          ><FaTrash/></button> </td>
                       </tr>
                    ))}
                 </tbody>
              </table>)
              
              :  null;
  
  
   }else{
     
      return fichierCsvDetails.length ? (
              <table>
                 <thead>
                    <tr>
                       <th>N°</th>
                       <th>Nom</th>
                       <th>Prénom</th>
                       <th>Email</th>
                       <th>Dénomination de l'entreprise</th>
                       <th></th>
                     </tr>
                 </thead>
                
                 <tbody>
                    {fichierCsvDetails.filter((entreprise) => entreprise.Nom && entreprise.Prenom && entreprise.Email && entreprise.DenominationEnt)
                            .map((entreprise, index) => (
                       <tr key={index}>
                          <td>{index+1}</td>
                          <td>{entreprise.Nom}</td>
                          <td>{entreprise.Prenom}</td>
                          <td>{entreprise.Email}</td>
                          <td>{entreprise.DenominationEnt}</td>
                          <td > <button style={{
                             width : '100%'
                          }}
                          onClick={() => {
                            if (window.confirm('Voulez-vous vraiment supprimer cet enseignant ?')) {
                               // Supprimer l'enseignant sélectionné par son index
                              setUtilisateur((prevUtilisateur) =>
                                prevUtilisateur.filter((_, i) => i !== index)
                              );
                            }
                          }}
                          ><FaTrash/></button> </td>
                       </tr>
                    ))}
                 </tbody>
              </table>)
              
              :  null;
   }
  }
 
 
*/
 
 }
 































/*import React from 'react';
import './gestion_des_utilisateurs.css';
import { useEffect,useState } from 'react';
import papa from 'papaparse';
import { FaPen, FaTrash } from 'react-icons/fa';
import axios from 'axios';

 
 function PageGestionUtilisateur() {
 

   const [utilisateur, setUtilisateur] = useState([]);

  
      
   const [activeTypeUtilisateur, setActivePage] = useState("Etudiant");

   const typeUtilisateur = {
     "Etudiant": <h2>Etudiant</h2>,
     "Enseignant": <h2>Enseignant</h2>,
     "Entreprise": <h2>Entreprise</h2>,
    };
 

    const storedStudent = [
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
      ['amar', 'yacine', 'yacine@gmail.com', 'RSD', '14,01'],
    ];


     // Effect to fetch data when the component mounts
  useEffect(() => {
   axios.get('http://127.0.0.1:8000/api/affiche-utilisateurs')
     .then(response => {
       console.log(response.data);
       setUtilisateur(response.data); // Store the fetched data in the state
     })
     .catch(error => {
       console.error('Erreur:', error);
     });
 }, []); // Empty dependency array ensures it runs only once




    const HandleCsvFile = (e)=>{
      const file = e.target.files[0];
      papa.parse(file,{
        header:true,
        complete:(result)=>{
         setUtilisateur(result.data);
        }
      });
    };

   


 
   return (
     <>
        <div className='addUsers'>
           <h1 style={{ color: 'grey' }}>Gestion des utilisateurs</h1>
            <nav className='navigation-user'>
              <ul>
                 {Object.keys(typeUtilisateur).map((typeUtilisateur) => (
                  <li  
                     className={activeTypeUtilisateur === typeUtilisateur?'active-type-user':''} 
                     key={typeUtilisateur} 
                     onClick={() => setActivePage(typeUtilisateur)}>
                    {typeUtilisateur}
                  </li>
                ))}
             </ul>
            </nav>

            <div>
               {typeUtilisateur[activeTypeUtilisateur]}
            </div>


            <div className='addButton'>
            <input type='file' accept='.csv' onChange={HandleCsvFile}/>
            <button>Enregister</button>
            </div>
            <div className='stored-users'>
            <table>
                <thead>
                   <tr>
                      <th>N°</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Intitulé des options</th>
                      <th>Moyenne Pondérée master 1</th>
                      <th></th>
                    </tr>
                </thead>
               
                <tbody>
                   {storedStudent
                           .map((student, index) => (
                      <tr key={index}>
                         <td>{index+1}</td>
                         <td>{student[0]}</td>
                         <td>{student[1]}</td>
                         <td>{student[2]}</td>
                         <td>{student[3]}</td>
                         <td>{student[4]}</td>
                         <td > <button style={{
                            width : '50%',
                            
                         }}
                         onClick={() => {
                           if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
                              // Supprimer l'enseignant sélectionné par son index
                             setUtilisateur((prevUtilisateur) =>
                               prevUtilisateur.filter((_, i) => i !== index)
                             );
                           }
                         }}
                         ><FaPen/></button>
                         <button style={{
                            width : '50%',
                             
                         }}
                         onClick={() => {
                           if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
                              // Supprimer l'enseignant sélectionné par son index
                             setUtilisateur((prevUtilisateur) =>
                               prevUtilisateur.filter((_, i) => i !== index)
                             );
                           }
                         }}
                         ><FaTrash/></button>
                          </td>
                      </tr>
                   ))}
                </tbody>
             </table>
            </div>
          
            <div className='tableField' >
             
            {setTypeUtilisateur()}
            </div>
        </div>
     </>
  );

 


  // fonction d'affichage des fichier CSV 

  function setTypeUtilisateur(){
   
   if(activeTypeUtilisateur === 'Etudiant'){
     return (utilisateur.length) ? (
          <table>
                <thead>
                   <tr>
                      <th>N°</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Intitulé des options</th>
                      <th>Moyenne Pondérée master 1</th>
                      <th></th>
                    </tr>
                </thead>
               
                <tbody>
                   {utilisateur.filter((student) => student.Nom && student.Prenom && student.Option && student.Moyenne)
                           .map((student, index) => (
                      <tr key={index}>
                         <td>{index+1}</td>
                         <td>{student.Nom}</td>
                         <td>{student.Prenom}</td>
                         <td>{student.Email}</td>
                         <td>{student.Option}</td>
                         <td>{student.Moyenne}</td>
                         <td > <button style={{
                            width : '50%',
                            
                         }}
                         onClick={() => {
                           if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
                              // Supprimer l'enseignant sélectionné par son index
                             setUtilisateur((prevUtilisateur) =>
                               prevUtilisateur.filter((_, i) => i !== index)
                             );
                           }
                         }}
                         ><FaPen/></button>
                         <button style={{
                            width : '50%',
                             
                         }}
                         onClick={() => {
                           if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
                              // Supprimer l'enseignant sélectionné par son index
                             setUtilisateur((prevUtilisateur) =>
                               prevUtilisateur.filter((_, i) => i !== index)
                             );
                           }
                         }}
                         ><FaTrash/></button>
                          </td>
                      </tr>
                   ))}
                </tbody>
             </table>)
             
             :  null;
   
  }else if(activeTypeUtilisateur === 'Enseignant'){
     return  utilisateur.length ? (
             <table>
                <thead>
                   <tr>
                      <th>N°</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Grade</th>
                      <th>Date de recrutement</th>
                      <th></th>
                    </tr>
                </thead>
               
                <tbody>
                   {utilisateur.filter((enseignant) => enseignant.Nom && enseignant.Prenom && enseignant.Email && enseignant.Grade && enseignant.DateRec)
                           .map((enseignant, index) => (
                      <tr key={index}>
                         <td>{index+1}</td>
                         <td> <input type="text"  value={enseignant.Nom}  
                                  onChange={(e) => {
                                     // Mettez à jour l'état de l'objet `enseignant` avec la nouvelle valeur
                                      setEnseignant((prevEnseignant) => ({
                                      ...enseignant,Nom: e.target.value,
                                       }));  
                                      }} />  </td>
                         <td>{enseignant.Prenom}</td>
                         <td>{enseignant.Email}</td>
                         <td>{enseignant.Grade}</td>
                         <td>{enseignant.DateRec}</td>
                         <td > <button 
                               style={{
                                 width : '100%'
                              }} 
                              onClick={() => {
                                 if (window.confirm('Voulez-vous vraiment supprimer cet entreprise ?')) {
                                    // Supprimer l'enseignant sélectionné par son index
                                   setUtilisateur((prevUtilisateur) =>
                                     prevUtilisateur.filter((_, i) => i !== index)
                                   );
                                 }
                               }}
                         ><FaTrash/></button> </td>
                      </tr>
                   ))}
                </tbody>
             </table>)
             
             :  null;
 
 
  }else{
    
     return utilisateur.length ? (
             <table>
                <thead>
                   <tr>
                      <th>N°</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Dénomination de l'entreprise</th>
                      <th></th>
                    </tr>
                </thead>
               
                <tbody>
                   {utilisateur.filter((entreprise) => entreprise.Nom && entreprise.Prenom && entreprise.Email && entreprise.DenominationEnt)
                           .map((entreprise, index) => (
                      <tr key={index}>
                         <td>{index+1}</td>
                         <td>{entreprise.Nom}</td>
                         <td>{entreprise.Prenom}</td>
                         <td>{entreprise.Email}</td>
                         <td>{entreprise.DenominationEnt}</td>
                         <td > <button style={{
                            width : '100%'
                         }}
                         onClick={() => {
                           if (window.confirm('Voulez-vous vraiment supprimer cet enseignant ?')) {
                              // Supprimer l'enseignant sélectionné par son index
                             setUtilisateur((prevUtilisateur) =>
                               prevUtilisateur.filter((_, i) => i !== index)
                             );
                           }
                         }}
                         ><FaTrash/></button> </td>
                      </tr>
                   ))}
                </tbody>
             </table>)
             
             :  null;
  }
 }



}




*/
/*
  {student.length ? 
             ( <table>
                  <thead>
                     <tr>
                        <th>N°</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Intitulé des options</th>
                        <th>Moyenne Pondérée master 1</th>
                        <th></th>
                      </tr>
                  </thead>
                 
                  <tbody>
                     {student.filter((student) => student.Nom && student.Prenom && student.Option && student.Moyenne)
                             .map((student, index) => (
                        <tr key={index}>
                           <td>{index+1}</td>
                           <td>{student.Nom}</td>
                           <td>{student.Prenom}</td>
                           <td>{student.Option}</td>
                           <td>{student.Moyenne}</td>
                           <td > <button style={{
                              width : '100%'
                           }}><FaTrash/></button> </td>
                        </tr>
                     ))}
                  </tbody>
               </table>)
               
               :  null}

*/

export default PageGestionUtilisateur