/* ici la page pour gerer les different acces  ne pas toucher seul admin  */





import React, { useState } from 'react';

function AddUserForm() {
    const [formData, setFormData] = useState({ nom: '', prenom: '',intitule_option_master1:'',moyenne_m1:'', email: '' ,type_utilisateur : ''});

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
            } else {
                const errorData = await response.json();
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the user.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
            <input type="text" name="prenom" placeholder="prenom" onChange={handleChange} required />
            <input type="text" name="intitule_option_master1" placeholder="intitule_option_master1" onChange={handleChange} required />
            <input type="text" name="moyenne_m1" placeholder="moyenne_m1" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="type_utilisateur" placeholder="type_utilisateur" onChange={handleChange} required />
            <button type="submit">Add User</button>
        </form>
    );
}

export default AddUserForm;
