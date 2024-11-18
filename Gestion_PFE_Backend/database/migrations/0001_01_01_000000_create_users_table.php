<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

         //creation de la table utiliasteurs_pfe 
        Schema::create('utilisateurs_pfe', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('type_utilisateur');
            $table->timestamps();
        });

        
        
        //creation de la table etudiant 
        Schema::create('etudiant', function (Blueprint $table) {
            $table->id();
            $table->string('intitule_option_master1');
            $table->string('moyenne_m1');
            // Définir une clé étrangère liée à la table utilisateurs_pfe
            // Utilisation de foreignId pour simplifier la création de la clé étrangère
            $table->foreignId('utilisateur_pfe_id')
                  ->constrained('utilisateurs_pfe')
                  ->onDelete('cascade'); // Lier la clé étrangère à l'id de utilisateurs_pfe

            $table->timestamps();
        });

          

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utiliasteurs_pfe');
        Schema::dropIfExists('etudiant');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
