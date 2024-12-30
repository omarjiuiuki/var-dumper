<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChoixPFE extends Model
{
     // Table associée au modèle
     protected $table = 'choix_pfe';

     // Attributs qui peuvent être assignés en masse
     protected $fillable = [
         'theme_pfe_id',
         'etudiant_1_id',
         'etudiant_2_id',
         'nbr_choix',
     ];

     // Relation avec le thème PFE
     public function themePfe()
     {
         return $this->belongsTo(ThemePFE::class, 'theme_pfe_id');
     }





     // Relation avec l'étudiant principal
     public function etudiant1()
     {
         return $this->belongsTo(Etudiant::class, 'etudiant_1_id');
     }

     // Relation avec l'étudiant secondaire (optionnel)
     public function etudiant2()
     {
         return $this->belongsTo(Etudiant::class, 'etudiant_2_id');
     }
}
