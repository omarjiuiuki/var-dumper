<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EtudiantController;

use App\Http\Controllers\EmailController;
use App\Http\Controllers\ThemePfeController;


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
Route::post('/projet', [ThemePfeController::class, 'store']);
