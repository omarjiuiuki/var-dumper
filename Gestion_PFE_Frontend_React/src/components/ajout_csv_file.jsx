
import React from "react";
import papa from 'papaparse';
function UploadCsvFile(){



 
  const HandleCsvFile = (e) => {
    const file = e.target.files[0];
    papa.parse(file, {
      header: true,
      complete: (result) => {
        setFichierCsvDetails(result.data);
      }
    });
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
    <div>
        <input type='file' accept='.csv' onChange={HandleCsvFile}/> 
        {afficheCsv}
    </div>
  );
   
}
export default UploadCsvFile;