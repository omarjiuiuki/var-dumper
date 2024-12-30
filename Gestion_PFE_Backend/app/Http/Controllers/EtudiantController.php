<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ThemePfe;
use App\Models\Etudiant;
use App\Models\UtilisateurPfe;

class EtudiantController extends Controller
{
    public function afficherEtudiant()
    {
        $etudiants = DB::table('etudiant')
        ->join('utilisateurs_pfe', 'etudiant.utilisateur_pfe_id', '=', 'utilisateurs_pfe.id')
        ->select(
            'etudiant.intitule_option_master1',
            'etudiant.moyenne_m1',
            'utilisateurs_pfe.nom',
            'utilisateurs_pfe.prenom',
            'utilisateurs_pfe.email',
            'utilisateurs_pfe.type_utilisateur'
        )
        ->get();

    return response()->json($etudiants);
    }



/*

*/


}
