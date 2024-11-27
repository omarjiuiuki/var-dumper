<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EtudiantController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/ajout-utilisateurs', [UserController::class, 'ajoutUtilisateur']);
Route::get('/affiche-utilisateurs', [UserController::class, 'afficherUtilisateur']);
Route::get('/affiche-etudiants', [EtudiantController::class, 'afficherEtudiant']);