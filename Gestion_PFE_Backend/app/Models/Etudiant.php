<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    // use HasFactory;

    protected $table = 'etudiant'; // Assurez-vous que c'est le bon nom de table

    protected $fillable = [
        'intitule_option_master1',
        //'moyenne_m1',
        'utilisateur_pfe_id', // Clé étrangère vers la table utilisateurs_pfe
    ];

    // Relation avec ThemePfe en tant qu'étudiant 1
    public function themesPfeEtudiant1()
    {
        return $this->hasMany(ThemePfe::class, 'etudiant_1_id');
    }

    // Relation avec ThemePfe en tant qu'étudiant 2
    public function themesPfeEtudiant2()
    {
        return $this->hasMany(ThemePfe::class, 'etudiant_2_id');
    }

    // Relation avec le modèle UtilisateurPfe
    public function utilisateur()
    {
        return $this->belongsTo(UtilisateurPfe::class, 'utilisateur_pfe_id');
    }
}
