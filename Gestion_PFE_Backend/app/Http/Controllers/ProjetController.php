<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\ThemePfe;
use App\Models\Etudiant;
use App\Models\UtilisateurPfe;

class ProjetController extends Controller
{
    /*
    public function getProjetParEtudiant($etudiantId)
    {
        $projet = DB::table('theme_pfe')
            ->join('etudiant', 'theme_pfe.etudiant_1_id', '=', 'etudiant.id')
            ->join('utilisateurs_pfe', 'etudiant.utilisateur_pfe_id', '=', 'utilisateurs_pfe.id')
            ->select(
                'theme_pfe.*',
                'utilisateurs_pfe.nom as etudiant_nom',
                'utilisateurs_pfe.prenom as etudiant_prenom',
                'etudiant.intitule_option_master1 as option'
            )
            ->where('theme_pfe.etudiant_1_id', $etudiantId)
            ->first();

        if (!$projet) {
            return response()->json(['message' => 'Projet non trouvé'], 404);
        }

        return response()->json($projet);
    }

    public function soumettreProjet(Request $request)
    {
        $validatedData = $request->validate([
            'intitule_pfe' => 'required|string|max:255',
            'type_pfe' => 'required|string',
            'description' => 'required|string',
            'option' => 'required|string',
            'etudiant_1_id' => 'required|exists:etudiant,id',
        ]);

        $projet = ThemePfe::updateOrCreate(
            ['etudiant_1_id' => $validatedData['etudiant_1_id']],
            array_merge($validatedData, [
                'proposer_par' => 'etudiant',
            ])
        );

        return response()->json(['message' => 'Projet soumis avec succès', 'theme_pfe' => $projet]);
    }*/
}
