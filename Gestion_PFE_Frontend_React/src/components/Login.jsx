import * as React from 'react';

function Login() {
    return (
      <div className='bg-[#ffffff] px-10 py-20 rounded-3xl border-2 border-gray-100'>
        <h1 className='text-5xl font-semibold text-black'>Connexion</h1>
        <p className='font-medium text-lg text-gray-500 mt-4'>Bienvenue! Veuillez saisir vos détails.</p>
        <div className='mt-8'>
            <div>
                <label className='text-lg font-medium text-black'>Email    </label>
                <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-black'
                placeholder='Entrez votre email'
                />
            </div>
            <div>
                <label className='text-lg font-medium text-black'>Mot de passe</label>
                <input
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-black'
                placeholder='Entrez votre mot de passe'
                />
            </div>
            
            <div className='mt-8 flex justify-between items-center'>
                <div>
                    <input
                    type="checkbox"
                    id='remember'
                    />
                    <label className='ml-2 font-medium text-base text-black' for="remember">Se Souvenir de</label>
                </div>
               
                <button className='font-medium text-base text-black'>Mot de passe oublié</button>
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
                <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out translate-all py-3 rounded-xl bg-[#1abc9c] text-black text-lg font-bold'>Se connecter</button>
            </div>
        </div>
      </div>
    );
}

export default Login;

