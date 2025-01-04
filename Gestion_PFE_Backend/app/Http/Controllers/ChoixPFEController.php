<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChoixPFE;

use App\Models\ThemePfe;

use Illuminate\Support\Facades\DB;

class ChoixPFEController extends Controller
{

    public function store(Request $request)
{
    $validated = $request->validate([
        'theme_pfe_id' => 'required|exists:theme_pfe,id',
        'etudiant_1_id' => 'required|exists:etudiant,id',
        'nbr_choix' => 'required|integer|min:1|max:10',
    ]);

    // Vérification si le projet est déjà sélectionné par l'étudiant
    $existingChoice = ChoixPFE::where('etudiant_1_id', $validated['etudiant_1_id'])
                               ->where('theme_pfe_id', $validated['theme_pfe_id'])
                               ->first();

    if ($existingChoice) {
        return response()->json(['error' => 'Ce projet a déjà été sélectionné par l\'étudiant.'], 400);
    }

    // Vérification du nombre de choix existants de l'étudiant
    $nombreDeChoix = ChoixPFE::where('etudiant_1_id', $validated['etudiant_1_id'])->count();

    if ($nombreDeChoix >= 10) {
        return response()->json(['error' => 'Vous ne pouvez pas sélectionner plus de 10 projets.'], 400);
    }

    // Création du nouveau choix
    $choix = ChoixPFE::create($validated);

    return response()->json($choix, 201);
}


public function update(Request $request, $id)
{
    $validated = $request->validate([
        'nbr_choix' => 'required|integer|min:1|max:10',
    ]);

    $choix = ChoixPFE::findOrFail($id);

    // Mettre à jour la priorité (nbr_choix) dans la base de données
    $choix->nbr_choix = $validated['nbr_choix'];
    $choix->save();  // Assurez-vous d'utiliser save() pour persister les modifications.

    return response()->json($choix);
}



public function destroy($id)
{
    $choix = ChoixPFE::findOrFail($id);
    $choix->delete();

    return response()->json(null, 204);
}

public function replace(Request $request, $oldProjectId)
{
    $validated = $request->validate([
        'new_theme_pfe_id' => 'required|exists:theme_pfe,id',
        'etudiant_1_id' => 'required|exists:etudiant,id',
    ]);

    // Vérifier que l'étudiant a déjà ce projet dans ses choix
    $existingChoice = ChoixPFE::where('etudiant_1_id', $validated['etudiant_1_id'])
                               ->where('id', $oldProjectId)
                               ->first();

    if (!$existingChoice) {
        return response()->json(['error' => 'Ce projet n\'est pas dans les choix de l\'étudiant.'], 400);
    }

    // Vérification que l'étudiant n'a pas plus de 10 projets
    $nombreDeChoix = ChoixPFE::where('etudiant_1_id', $validated['etudiant_1_id'])->count();

    if ($nombreDeChoix >= 10) {
        return response()->json(['error' => 'Vous ne pouvez pas avoir plus de 10 projets.'], 400);
    }

    // Remplacer le projet par un nouveau
    $existingChoice->update([
        'theme_pfe_id' => $validated['new_theme_pfe_id'],
    ]);

    return response()->json($existingChoice);
}

public function getProjetByEtudiant($etudiantId)
{
    // Recherche du projet de l'étudiant (etudiant_1_id ou etudiant_2_id)
    $projet = \App\Models\ThemePFE::where('etudiant_1_id', $etudiantId)
                      ->orWhere('etudiant_2_id', $etudiantId)
                      ->first();

    // Si le projet est trouvé, retourner l'intitulé et est_valider
    if ($projet) {
        return response()->json([
            'intitule_pfe' => $projet->intitule_pfe,
            'est_valider' => $projet->est_valider
        ], 200);
    } else {
        return response()->json(['message' => 'Aucun projet trouvé pour cet étudiant.'], 404);
    }
}

/*
public function getProjetByEtudiant($etudiant_id)
{
    // Récupérer le projet et les informations liées à l'étudiant
    $projet = ThemePfe::select(
            'theme_pfe.*',
            'etudiants.nom as etudiant_1_nom',
            'etudiants.prenom as etudiant_1_prenom',
            'utilisateurs_pfe.option'
        )
        ->join('etudiants', 'theme_pfe.etudiant_1_id', '=', 'etudiants.id')
        ->join('utilisateurs_pfe', 'etudiants.utilisateur_pfe_id', '=', 'utilisateurs_pfe.id')
        ->where('theme_pfe.etudiant_1_id', $etudiant_id)
        ->first();

    // Vérification si le projet est trouvé
    if ($projet) {
        return response()->json($projet);
    } else {
        return response()->json(['message' => 'Aucun projet trouvé pour cet étudiant.'], 404);
    }
}
*/


public function getSelectedProjects($etudiantId)
{
    // Récupérer tous les choix de projets pour un étudiant, y compris les détails des projets
    $selectedProjects = ChoixPFE::where('etudiant_1_id', $etudiantId)
        ->with(['themePfe']) // Assurez-vous que la relation avec le modèle ThemePFE est définie
        ->orderBy('nbr_choix', 'asc') // Trier par priorité
        ->get();

    // Vérifiez si l'étudiant a déjà sélectionné 10 projets
    if ($selectedProjects->count() >= 10) {
        // L'étudiant a 10 projets ou plus, on peut lui envoyer ces projets
        return response()->json([
            'selected_projects' => $selectedProjects
        ]);
    } else {
        // Si l'étudiant n'a pas encore 10 projets, vous pouvez ajouter une autre logique
        return response()->json([
            'selected_projects' => $selectedProjects,
            'message' => 'L\'étudiant n\'a pas encore sélectionné 10 projets.'
        ]);
    }
}

}
