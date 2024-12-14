<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Email extends Model
{
    protected $table = 'email_pfe_template';


    protected $fillable = [
       
        'type_email',
        'contenue',
    ];


}
