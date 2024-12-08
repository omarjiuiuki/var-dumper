/* ici la page pour gerer les different acces  ne pas toucher seul admin  */





import React, { useState} from 'react';
import { useSearchParams } from "react-router-dom";


function AddUserForm() {
    const [searchParams] = useSearchParams();
    const parametre = searchParams.get("type-email"); 

    const [formData, setFormData] = useState({ nom: '', prenom: '',intitule_option_master1:'',mot_de_passe : '',moyenne_m1:'', email: '' ,type_utilisateur : ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/ajout-utilisateurs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('User added successfully');
                document.getElementsByName('nom')[0].value = '';
                document.getElementsByName('prenom')[0].value = '';
                document.getElementsByName('email')[0].value = '';
                document.getElementsByName('intitule_option_master1')[0].value = '';
                document.getElementsByName('moyenne_m1')[0].value = '';
                document.getElementsByName('mot_de_passe')[0].value = '';
                document.getElementsByName('type_utilisateur')[0].value = '';
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the user.');
        }
    };





    const handleSubmitemail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/ajout-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Email added successfully');
                document.getElementsByName('type_email')[0].value = '';
                document.getElementsByName('contenue')[0].value = '';
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the email .');
        }
    };

 








    return (
      <div>
         <h1>{parametre}</h1>
        <form onSubmit={/*handleSubmit*/ handleSubmitemail}>
            {/*<input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
            <input type="text" name="prenom" placeholder="prenom" onChange={handleChange} required />
            <input type="text" name="intitule_option_master1" placeholder="intitule_option_master1" onChange={handleChange} required />
            <input type="text" name="moyenne_m1" placeholder="moyenne_m1" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="mot_de_passe" placeholder="mot_de_passe" onChange={handleChange} required />
            <input type="text" name="type_utilisateur" placeholder="type_utilisateur" onChange={handleChange} required />
            */}
            <input type="text" name="type_email" placeholder="type_email" onChange={handleChange} required />
            <input type="text" name="contenue" placeholder="contenue" onChange={handleChange} required />
         
           {/* <button type="submit">Add User</button>*/}
            <button type="submit">Add Email</button>
        </form>
        </div>

    );
}

export default AddUserForm;
