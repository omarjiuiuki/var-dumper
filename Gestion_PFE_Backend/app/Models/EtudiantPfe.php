<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\UtilisateurPfe;

class EtudiantPfe extends Model
{

    protected $table = 'etudiant';


    protected $fillable = [

        'intitule_option_master1',
        'moyenne_m1',
        'utilisateur_pfe_id',
    ];

    public function utilisateurPfe()
    {
        return $this->belongsTo(User::class, 'utilisateur_pfe_id');
    }



}
