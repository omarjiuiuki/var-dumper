<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EtudiantController;

use App\Http\Controllers\EmailController;
use App\Http\Controllers\ThemePfeController;
use App\Http\Controllers\ChoixPFEController;

use App\Http\Controllers\ProjetController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/ajout-utilisateurs', [UserController::class, 'ajoutUtilisateur']);
Route::post('/ajout-email', [EmailController::class, 'ajouterEmail']);
Route::post('/ajout-theme', [ThemePfeController::class, 'ajouterTheme']);
Route::post('/validation', [ThemePfeController::class, 'validationTheme']);
Route::post('/refue', [ThemePfeController::class, 'refueTheme']);
Route::get('/affiche-utilisateurs', [UserController::class, 'afficherUtilisateur']);
Route::get('/affiche-etudiants', [EtudiantController::class, 'afficherEtudiant']);
Route::get('/email-template', [EmailController::class, 'getEmailTemplate']);
Route::get('/theme_detail', [ThemePfeController::class, 'afficherThemePfe']);
Route::put('/modif-email', [EmailController::class, 'modifierEmail']);

//plus de OMAR


Route::post('/projet', [ThemePfeController::class, 'store']);
Route::put('/projet/{id}', [ThemePfeController::class, 'update']);
Route::get('/projet/{id}', [ThemePfeController::class, 'show']);
// Route pour récupérer l'intitulé et est_valider d'un projet pour un étudiant donné
Route::get('/projet/etudiant/{etudiantId}/details', [ThemePfeController::class, 'getProjetForEtudiant']);
Route::get('/api/projects/enseignant', [ThemePfeController::class, 'getEnseignantProjects']);
Route::get('/api/projects/entreprise', [ThemePfeController::class, 'getEntrepriseProjects']);
Route::get('/api/projet/etudiant/{etudiantId}', [ProjetController::class, 'getProjetByEtudiantId']);


/*
Route::get('/projects', function () {
    // Récupérer uniquement les projets proposés par les enseignants
    $projects = ThemePfe::where('proposer_par', 'enseignant')->get();

    return response()->json($projects);
});*/


use App\Models\Etudiant;
use App\Models\ThemePfe;
Route::get('/projects/{etudiant_id}', function ($etudiant_id) {
    $etudiant = Etudiant::find($etudiant_id);

    if (!$etudiant) {
        return response()->json(['error' => 'Étudiant introuvable'], 404);
    }

    $option = $etudiant->intitule_option_master1;

    $projectsByTeachers = ThemePfe::with(['enseignantResponsable.utilisateur', 'encadrant.utilisateur'])
        ->where('option', $option)
        ->where('proposer_par', 'enseignant')
        ->get();

    // Déboguer pour vérifier les projets récupérés
    //dd($projectsByTeachers);

    $projectsByCompanies = ThemePfe::with('contactEntreprise.utilisateur')
        ->where('option', $option)
        ->where('proposer_par', 'entreprise')
        ->get();

    return response()->json([
        'teacher_projects' => $projectsByTeachers,
        'company_projects' => $projectsByCompanies,
    ]);
});



// Ajouter un choix
Route::post('/choix-pfe', [ChoixPFEController::class, 'store']);

// Modifier un choix
Route::put('/choix-pfe/{id}', [ChoixPFEController::class, 'update']);

// Supprimer un choix
Route::delete('/choix-pfe/{id}', [ChoixPFEController::class, 'destroy']);

Route::put('/choix-pfe/{oldProjectId}/replace', [ChoixPFEController::class, 'replace']);

// Récupérer les projets sélectionnés par un étudiant
Route::get('/choix-pfe/{etudiantId}', [ChoixPFEController::class, 'getSelectedProjects']);


//recuperer les infos de etudiant 1

//use App\Http\Controllers\EtudiantController;

Route::get('etudiant/{id}', [EtudiantController::class, 'getEtudiantDetails']);


//soumetre un projet




//Route::get('/projet/etudiant/{etudiantId}', [ProjetController::class, 'getProjetParEtudiant']);
//Route::post('/projet', [ProjetController::class, 'soumettreProjet']);



//soumetre un projet





























/*
Route::get('/projects/{etudiant_id}', function ($etudiant_id) {
    $etudiant = Etudiant::find($etudiant_id);

    if (!$etudiant) {
        return response()->json(['error' => 'Étudiant introuvable'], 404);
    }

    $option = $etudiant->intitule_option_master1;

    $projectsByTeachers = ThemePfe::with(['enseignantResponsable.utilisateur'])
        ->where('option', $option)
        ->where('proposer_par', 'enseignant')
        ->get();

    $projectsByCompanies = ThemePfe::with('contactEntreprise.utilisateur')
        ->where('option', $option)
        ->where('proposer_par', 'entreprise')
        ->get();



    return response()->json([
        'teacher_projects' => $projectsByTeachers,
        'company_projects' => $projectsByCompanies,
    ]);
});

*/
