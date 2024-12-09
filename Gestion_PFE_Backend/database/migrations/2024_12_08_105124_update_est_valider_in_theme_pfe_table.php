<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('theme_pfe', function (Blueprint $table) {
            $table->enum('est_valider', ['en_attente', 'valide', 'refuse'])->default('en_attente')->change();
        });
    }
    
    public function down()
    {
        Schema::table('theme_pfe', function (Blueprint $table) {
            $table->boolean('est_valider')->default(false)->change();
        });
    }
};
