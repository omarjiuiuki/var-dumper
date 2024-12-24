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
        'description',
        'option',
        'note',
        'date_soutenance',
        'etudiant_1_id',
        'etudiant_2_id',
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
}
