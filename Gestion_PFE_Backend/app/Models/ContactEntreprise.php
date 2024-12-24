<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactEntreprise extends Model
{
    //use HasFactory;

    protected $table = 'contact_entreprise'; // Nom de la table dans la base de données
    protected $fillable = [
        'denomination_entreprise',
        'utilisateur_pfe_id',
    ];

    /**
     * Relation avec la table UtilisateurPfe.
     * Un contact d'entreprise est lié à un utilisateur.
     */
    public function utilisateur()
    {
        return $this->belongsTo(UtilisateurPfe::class, 'utilisateur_pfe_id');
    }

    /**
     * Relation avec la table ThemePfe.
     * Une entreprise peut proposer plusieurs thèmes de PFE.
     */
    public function themesProposes()
    {
        return $this->hasMany(ThemePfe::class, 'contact_entreprise_id');
    }
}
