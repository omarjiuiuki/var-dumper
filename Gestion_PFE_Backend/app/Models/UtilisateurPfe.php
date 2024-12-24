<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UtilisateurPfe extends Model
{
  //use HasFactory;

  protected $table = 'utilisateurs_pfe'; // Nom de la table

  protected $fillable = [
      'nom',
      'prenom',
      'email',
      'mot_de_passe',
      'type_utilisateur',
      'remember_token', // Si utilisé
  ];

  // Relations
  public function etudiants()
  {
      return $this->hasMany(Etudiant::class, 'utilisateur_pfe_id');
  }
/*
  public function enseignants()
  {
      return $this->hasMany(Enseignant::class, 'utilisateur_pfe_id');
  }

  public function contactsEntreprise()
  {
      return $this->hasMany(ContactEntreprise::class, 'utilisateur_pfe_id');
  }

  public function emailsPfeTemplates()
  {
      return $this->hasMany(EmailPfeTemplate::class, 'utilisateur_pfe_id');
  }

  public function formulairesPfeTemplates()
  {
      return $this->hasMany(FormulairePfeTemplate::class, 'utilisateur_pfe_id');
  }*/
}

