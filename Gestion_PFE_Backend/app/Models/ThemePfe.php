<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Etudiant;


use Illuminate\Database\Eloquent\Model;




class ThemePfe extends Model
{
    use HasFactory;

    protected $table = 'theme_pfe';

    protected $fillable = [
        'intitule_pfe',
        'type_pfe',
        'proposer_par',
        'description',
        'option',
        'note',
        'est_valider',
        'date_soutenance',
        'etudiant_1_id',
        'etudiant_2_id',
        'technologies', // Ajout de technologies
        'materials',    // Ajout de materials
    ];

    // Relations (si nécessaires)
    public function etudiant1()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_1_id');
    }

    public function etudiant2()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_2_id');
    }


public function contactEntreprise()
{
    return $this->belongsTo(ContactEntreprise::class, 'contact_entreprise_id');
}



// Modèle ThemePfe
public function enseignantResponsable()
{
    return $this->belongsTo(Enseignant::class, 'enseignant_responsable_id');
}

public function encadrant()
{
    return $this->belongsTo(Enseignant::class, 'encadrant_id');
}

public function choixPfes()
{
    return $this->hasMany(ChoixPFE::class, 'theme_pfe_id');
}


}
