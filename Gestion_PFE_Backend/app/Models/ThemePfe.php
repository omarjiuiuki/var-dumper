<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThemePfe extends Model
{
     
    protected $table = 'theme_pfe';


    protected $fillable = [
       
        'intitule_pfe',
        'type_pfe',
        'description',
        'option',
    ];

  
}
