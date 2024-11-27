<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\EtudiantPfe;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function ajoutUtilisateur(Request $request)
    {
        $validatedData = $request->validate([
          //  'utilisateur_pfe_id' => 'required|exists:utilisateurs_pfe,id', // Assurez-vous que l'ID de l'utilisateur existe dans la table utilisateurs_pfe
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs_pfe',
            'mot_de_passe' =>'required|string|min:8',
            'type_utilisateur' => 'required|string|max:255',
            'intitule_option_master1' => 'required|string|max:255',
            'moyenne_m1' => 'required|string|max:255',
        ]);

        $user = User::create([
            'nom' => $validatedData['nom'],
            'prenom' => $validatedData['prenom'],
            'email' => $validatedData['email'],
            'mot_de_passe' => bcrypt($validatedData['mot_de_passe']),
            'type_utilisateur' => $validatedData['type_utilisateur'],
        ]);

       
        $etudiant = EtudiantPfe::create([
            'intitule_option_master1' => $validatedData['intitule_option_master1'],
            'moyenne_m1' => $validatedData['moyenne_m1'],
            'utilisateur_pfe_id' =>$user->id, // Associe l'étudiant à un utilisateur
        ]);



        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }



    public function afficherUtilisateur() {
        $utilisateurs = User::all();
        return response()->json($utilisateurs);
    }
    
}