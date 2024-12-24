<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enseignant extends Model
{
   // use HasFactory;

    protected $table = 'enseignant'; // Nom de la table dans la base de données
    protected $fillable = [
        'grade',
        'date_recrutement',
        'est_responsable_de',
        'utilisateur_pfe_id',
    ];

    /**
     * Relation avec la table UtilisateurPfe.
     * Un enseignant est lié à un utilisateur.
     */
   // Modèle Enseignant
public function utilisateur()
{
    return $this->belongsTo(UtilisateurPfe::class, 'utilisateur_pfe_id');
}


    /**
     * Relation avec la table ThemePfe.
     * Un enseignant peut encadrer plusieurs thèmes de PFE.
     */
    public function themesEncadres()
    {
        return $this->hasMany(ThemePfe::class, 'encadrant_id');
    }

    /**
     * Relation pour les thèmes où l'enseignant est responsable.
     */
    public function themesResponsables()
    {
        return $this->hasMany(ThemePfe::class, 'enseignant_responsable_id');
    }

}
