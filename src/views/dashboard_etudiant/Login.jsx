import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'; // Importer axios directement
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

// Configuration Axios
const BASE_URL = 'http://127.0.0.1:8000/api'; // Remplacez par l'URL de votre API backend Laravel

const  axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,  // Cela permet d'envoyer les cookies d'authentification avec chaque requête
});







function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialiser useNavigate

    const handleLogin = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
    
        try {
            // Obtenir le cookie CSRF
            await axiosInstance.get('/sanctum/csrf-cookie'); // Utilisation d'axiosInstance
    
            // Maintenant, envoyez les données au backend Laravel via Axios
            const response = await axiosInstance.post('/axios', {
                email: email,
                password: password,
            });
    
            // Vérifiez si la connexion est réussie
            if (response.status === 200) {
                console.log("Connexion réussie :", response.data);
    
                // Si la connexion est réussie, redirigez vers le Dashboard
                navigate('/dashboard-etudiant-main'); // Redirection vers DashboardEtudiantMain
            }
        } catch (error) {
            if (error.response) {
                // Réponse du backend
                console.error("Erreur du backend :", error.response.data);
                alert(error.response.data.message || "Erreur inconnue");
            } else if (error.request) {
                // Pas de réponse du backend
                console.error("Pas de réponse du serveur :", error.request);
                alert("Impossible de joindre le serveur. Veuillez réessayer plus tard.");
            } else {
                // Erreur dans la configuration de la requête
                console.error("Erreur inconnue :", error.message);
                alert("Une erreur inattendue s'est produite.");
            }
        }
    };
    
    

    return (
        <div className='bg-[#ffffff] px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold text-black'>Connexion</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Bienvenue! Veuillez saisir vos détails.</p>
            <form onSubmit={handleLogin}>
                <div className='mt-8'>
                    <div>
                        <label className='text-lg font-medium text-black'>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-black'
                            placeholder='Entrez votre email'
                        />
                    </div>
                    <div>
                        <label className='text-lg font-medium text-black'>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-black'
                            placeholder='Entrez votre mot de passe'
                        />
                    </div>

                    <div className='mt-8 flex justify-between items-center'>
                        <div>
                            <input type="checkbox" id='remember' />
                            <label className='ml-2 font-medium text-base text-black' htmlFor="remember">Se Souvenir de</label>
                        </div>
                        <button className='font-medium text-base text-black'>Mot de passe oublié</button>
                    </div>
                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out translate-all py-3 rounded-xl bg-[#1abc9c] text-black text-lg font-bold'>
                            Se connecter
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;



