<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\ThemePfe;
use App\Models\Etudiant;

class ThemePfeController extends Controller
{
    public function store(Request $request)
    {
        // Validation des données envoyées dans la requête
        $validatedData = $request->validate([
            'intitule_pfe' => 'required|string|max:255',
            'type_pfe' => 'required|string|max:50',
            'description' => 'required|string',
            'option' => 'required|string|max:50',
            'etudiant_1_id' => 'required|exists:etudiant,id', // L'étudiant 1 doit exister
            'etudiant_2_id' => 'nullable|exists:etudiant,id', // Binôme facultatif
            'technologies' => 'nullable|string',
            'materials' => 'nullable|string',
        ]);

        // Récupérer l'étudiant 1 pour l'afficher son nom et prénom
        $etudiant1 = Etudiant::with('utilisateurPfe')->find($request->etudiant_1_id);
        if (!$etudiant1) {
            return response()->json(['message' => 'Étudiant 1 non trouvé.'], 404);
        }

        // Récupérer l'étudiant 2 si disponible
        $etudiant2 = $request->etudiant_2_id ? Etudiant::with('utilisateurPfe')->find($request->etudiant_2_id) : null;

        // Si un projet existe déjà pour l'étudiant, le mettre à jour
        $existingProject = ThemePfe::where('etudiant_1_id', $request->etudiant_1_id)->first();
        if ($existingProject) {
            $existingProject->update($validatedData);
            return response()->json([
                'message' => 'Projet mis à jour avec succès.',
                'theme_pfe' => $existingProject,
            ], 200);
        }




        // Si aucun projet n'existe, créer un nouveau projet
        $themePfe = ThemePfe::create($validatedData);

        // Retourner les données du projet avec le nom de l'étudiant et l'option
        return response()->json([
            'message' => 'Projet enregistré avec succès.',
            'theme_pfe' => $themePfe,
            'etudiant_1_nom' => $etudiant1->utilisateurPfe->nom,
            'etudiant_1_prenom' => $etudiant1->utilisateurPfe->prenom,
            'etudiant_1_option' => $etudiant1->intitule_option_master1,
            'etudiant_2_nom' => $etudiant2 ? $etudiant2->utilisateurPfe->nom : null,
            'etudiant_2_prenom' => $etudiant2 ? $etudiant2->utilisateurPfe->prenom : null,
        ], 201);
    }

/*
public function store(Request $request)
{
    // Validation des données envoyées dans la requête
    $validatedData = $request->validate([
        'intitule_pfe' => 'required|string|max:255',
        'type_pfe' => 'required|string|max:50',
        'description' => 'required|string',
        'option' => 'required|string|max:50',
        'etudiant_1_id' => 'required|exists:etudiant,id', // L'étudiant 1 doit exister
        'etudiant_2_id' => 'nullable|exists:etudiant,id', // Binôme facultatif
        'technologies' => 'nullable|string', // Nouvelle validation pour technologies
    'materials' => 'nullable|string', // Nouvelle validation pour materials
    ]);

    // Vérifier si l'étudiant 1 a déjà un projet
    $existingProject = \App\Models\ThemePfe::where('etudiant_1_id', $request->etudiant_1_id)->first();

    if ($existingProject) {
        // Si un projet existe déjà pour cet étudiant, le mettre à jour
        $existingProject->update($validatedData);

        return response()->json([
            'message' => 'Projet mis à jour avec succès.',
            'theme_pfe' => $existingProject,
        ], 200);
    }

    // Si aucun projet n'existe, créer un nouveau projet
    $themePfe = \App\Models\ThemePfe::create($validatedData);

    return response()->json([
        'message' => 'Projet enregistré avec succès.',
        'theme_pfe' => $themePfe,
    ], 201);
}
*/
// Méthode pour mettre à jour un projet existant
public function update(Request $request, $id)
{
    // Validation des données envoyées dans la requête
    $validatedData = $request->validate([
        'intitule_pfe' => 'required|string|max:255',
        'type_pfe' => 'required|string|max:50',
        'description' => 'required|string',
        'option' => 'required|string|max:50',
        'etudiant_1_id' => 'required|exists:etudiant,id',
        'etudiant_2_id' => 'nullable|exists:etudiant,id', // Binôme facultatif
        'technologies' => 'nullable|string', // Nouvelle validation pour technologies
    'materials' => 'nullable|string', // Nouvelle validation pour materials
    ]);

    // Recherche du projet par ID
    $themePfe = \App\Models\ThemePfe::find($id);

    if (!$themePfe) {
        return response()->json(['message' => 'Projet introuvable.'], 404);
    }

    // Mise à jour du projet avec les nouvelles données
    $themePfe->update($validatedData);

    return response()->json([
        'message' => 'Projet mis à jour avec succès.',
        'theme_pfe' => $themePfe,
    ]);
}

// Méthode pour récupérer un projet par ID
public function show($id)
{
    $projet = \App\Models\ThemePfe::find($id);
    if ($projet) {
        return response()->json(['theme_pfe' => $projet], 200);
    } else {
        return response()->json(['message' => 'Projet non trouvé.'], 404);
    }
}


public function getProjetForEtudiant($etudiantId)
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



// Projets proposés par les enseignants

public function getEnseignantProjects()
{
    $projects = \App\Models\ThemePfe::where('proposer_par', 'Enseignant')->get();
    //dd($projects); // Affiche les projets et arrête l'exécution pour inspection
    return response()->json($projects);
}

public function getEntrepriseProjects()
{
    $projects = \App\Models\ThemePfe::where('proposer_par', 'Entreprise')->get();
    //dd($projects); // Affiche les projets et arrête l'exécution pour inspection
    return response()->json($projects);
}


public function getProjetByEtudiantId($etudiantId)
{
    $projet = DB::table('theme_pfe')
        ->join('etudiant', 'theme_pfe.etudiant_1_id', '=', 'etudiant.id')
        ->join('utilisateurs_pfe', 'etudiant.utilisateur_pfe_id', '=', 'utilisateurs_pfe.id')
        ->select(
            'theme_pfe.intitule_pfe',
            'theme_pfe.type_pfe',
            'theme_pfe.description',
            'theme_pfe.option',
            'utilisateurs_pfe.nom as etudiant_nom',
            'utilisateurs_pfe.prenom as etudiant_prenom',
            'etudiant.intitule_option_master1'
        )
        ->where('theme_pfe.proposer_par', '=', 'etudiant')
        ->where('theme_pfe.etudiant_1_id', '=', $etudiantId)
        ->first();

    if (!$projet) {
        return response()->json(['message' => 'Aucun projet trouvé pour cet étudiant.'], 404);
    }

    return response()->json($projet);
}


/*
    public function afficherThemePfe()
    {
        $theme = DB::table('theme_pfe')->get();
        return response()->json($theme);
       }


       public function ajouterTheme(Request $request)
        {
            $validatedData = $request->validate([

              'intitule_pfe'=> 'required|string|max:255',
              'type_pfe'=> 'required|string|max:255',
              'description'=> 'required|string|max:255',
              'option'=> 'required|string|max:255',
            ]);

            $theme = ThemePfe::create([
                'intitule_pfe' => $validatedData['intitule_pfe'],
                'type_pfe' => $validatedData['type_pfe'],
                'description' => $validatedData['description'],
                'option' => $validatedData['option'],
            ]);

           return response()->json(['message' => 'theme created successfully', 'theme' => $theme], 201);
         }




         public function validationTheme(Request $request)
         {
             // Valider les données entrantes
        $validated = $request->validate([
            'id' => 'required|integer|exists:theme_pfe,id', // Assurez-vous que l'ID existe dans votre table
            'est_valider' => 'required|string|max:255', // Adaptez selon vos besoins
        ]);

        // Mettre à jour directement avec la méthode `update`
        $updated = ThemePfe::where('id', $validated['id'])
            ->update(['est_valider' => $validated['est_valider']]); // Remplacez par le nom de votre colonne

        if ($updated) {
            return response()->json(['message' => 'Champ mis à jour avec succès'], 200);
        }

        return response()->json(['error' => 'Impossible de mettre à jour'], 500);
          }




          public function refueTheme(Request $request)
          {
              // Valider les données entrantes
         $validated = $request->validate([
             'id' => 'required|integer|exists:theme_pfe,id', // Assurez-vous que l'ID existe dans votre table
             'est_valider' => 'required|string|max:255',
             'motif' => 'required|string|max:255'
         ]);

         // Mettre à jour directement avec la méthode `update`
         $updated = ThemePfe::where('id', $validated['id'])
         ->update([
            'est_valider' => $validated['est_valider'],
            'motif_refue' => $validated['motif']
        ]);
         if ($updated) {
             return response()->json(['message' => 'Champ mis à jour avec succès'], 200);
         }

         return response()->json(['error' => 'Impossible de mettre à jour'], 500);
           }


/*
           public function store(Request $request)
           {
               $validatedData = $request->validate([
                   'intitule_pfe' => 'required|string|max:255',
                   'type_pfe' => 'required|string|max:50',
                   'description' => 'required|string',
                   'option' => 'required|string|max:50',
                   //'note' => 'nullable|string|max:10',
                   //'date_soutenance' => 'required|date',
                   'etudiant_1_id' => 'required|exists:etudiant,id',
                   'etudiant_2_id' => 'nullable|exists:etudiant,id', // Pour binôme facultatif
               ]);

               // Insérer dans la table theme_pfe
               $themePfe = \App\Models\ThemePfe::create($validatedData);

               return response()->json([
                   'message' => 'Projet enregistré avec succès.',
                   'theme_pfe' => $themePfe,
               ], 201);
           }

*/

}
