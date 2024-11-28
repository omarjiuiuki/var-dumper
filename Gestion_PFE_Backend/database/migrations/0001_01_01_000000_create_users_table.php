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
            $table->string('mot_de_passe');
            $table->string('remember_token')->nullable();
            $table->string('type_utilisateur');
            $table->timestamps();
        });

        
        
        //creation de la table etudiant 
        Schema::create('etudiant', function (Blueprint $table) {
            $table->id();
            $table->string('intitule_option_master1');
            $table->double('moyenne_m1');
            // Définir une clé étrangère liée à la table utilisateurs_pfe
            // Utilisation de foreignId pour simplifier la création de la clé étrangère
            $table->foreignId('utilisateur_pfe_id')
                  ->constrained('utilisateurs_pfe')
                  ->onDelete('cascade'); // Lier la clé étrangère à l'id de utilisateurs_pfe

            $table->timestamps();
        });


        Schema::create('enseignant', function (Blueprint $table) {
            $table->id();
            $table->string('grade');
            $table->date('date_recrutement');
            $table->string('est_responsable_de')->unique();
            $table->foreignId('utilisateur_pfe_id')
                  ->constrained('utilisateurs_pfe')
                  ->onDelete('cascade'); // Lier la clé étrangère à l'id de utilisateurs_pfe

            $table->timestamps();
        });


        Schema::create('contact_entreprise', function (Blueprint $table) {
            $table->id();
            $table->string('denomination_entreprise');
            $table->foreignId('utilisateur_pfe_id')
                  ->constrained('utilisateurs_pfe')
                  ->onDelete('cascade'); // Lier la clé étrangère à l'id de utilisateurs_pfe

            $table->timestamps();
        });


        
      
          
       
       
       



        Schema::create('salle_soutenance', function (Blueprint $table) {
            $table->id();
            $table->string('intitule_salle');
            $table->string('position_salle');
            $table->timestamps();
        });

        Schema::create('theme_pfe', function (Blueprint $table) {
            $table->id();
            $table->string('intitule_pfe');
            $table->string('type_pfe');
            $table->string('description');
            $table->string('option');
            $table->string('note');
            $table->date('date_soutenance');
            $table->boolean('est_valider')->default(false);
           
            $table->foreignId('enseignant_responsable_id')
                  ->constrained('enseignant'); // Lier la clé étrangère à l'id de enseignant
            
            $table->foreignId('encadrant_id')
                  ->constrained('enseignant');
           
                  
            $table->foreignId('etudiant_1_id')
                  ->constrained('etudiant'); // Lier la clé étrangère à l'id de enseignant
            
            $table->foreignId('etudiant_2_id')
                  ->constrained('etudiant');    
                  
          
            $table->foreignId('salle_soutenance_id')
                  ->constrained('salle_soutenance'); // Lier la clé étrangère à l'id de enseignant
            
            $table->foreignId('contact_entreprise_id')
                  ->constrained('contact_entreprise');        
 
            $table->timestamps();
        });
          
  


        Schema::create('choix_pfe', function (Blueprint $table) {
            $table->id();
           
            $table->foreignId('theme_pfe_id')
                  ->constrained('theme_pfe');
            
            $table->foreignId('etudiant_1_id')
                  ->constrained('etudiant');

            $table->foreignId('etudiant_2_id')
                  ->constrained('etudiant');

            $table->timestamps();
        });  
     
     
     
        Schema::create('choix_jury_pfe', function (Blueprint $table) {
            $table->id();
           
            $table->foreignId('theme_pfe_id')
                  ->constrained('theme_pfe');
            
            $table->foreignId('enseignant_id')
                  ->constrained('enseignant');

            $table->timestamps();
        });  


        Schema::create('co_encadrant', function (Blueprint $table) {
            $table->id();
           
            $table->foreignId('theme_pfe_id')
                  ->constrained('theme_pfe');
            
            $table->foreignId('enseignant_id')
                  ->constrained('enseignant');

            $table->timestamps();
        });  

       
        Schema::create('presidant', function (Blueprint $table) {
            $table->id();
           
            $table->foreignId('theme_pfe_id')
                  ->constrained('theme_pfe');
            
            $table->foreignId('enseignant_id')
                  ->constrained('enseignant');

            $table->timestamps();
        }); 


        Schema::create('examinateur', function (Blueprint $table) {
            $table->id();
           
            $table->foreignId('theme_pfe_id')
                  ->constrained('theme_pfe');
            
            $table->foreignId('enseignant_id')
                  ->constrained('enseignant');

            $table->timestamps();
        }); 





        Schema::create('email_pfe_template', function (Blueprint $table) {
            $table->id();
            $table->string('type_email');
            $table->string('contenue');
            $table->foreignId('utilisateur_pfe_id')
                  ->constrained('utilisateurs_pfe')
                  ->onDelete('cascade'); // Lier la clé étrangère à l'id de utilisateurs_pfe

            $table->timestamps();
        });
        
        Schema::create('formulaire_pfe_template', function (Blueprint $table) {
            $table->id();
            $table->string('type_formulaire');
            $table->date('date_ouverture');
            $table->date('date_cloture');
            $table->foreignId('utilisateur_pfe_id')
                  ->constrained('utilisateurs_pfe')
                  ->onDelete('cascade'); // Lier la clé étrangère à l'id de utilisateurs_pfe

            $table->timestamps();
        });



        Schema::create('option_master', function (Blueprint $table) {
            $table->id();
            $table->string('intitule_option');
            $table->foreignId('enseignant_responsable_id')
                  ->constrained('enseignant')
                  ->onDelete('cascade'); // Lier la clé étrangère à l'id de enseignant

            $table->timestamps();
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
        Schema::dropIfExists('enseignant');
        Schema::dropIfExists('contact_entreprise');
        Schema::dropIfExists('salle_soutenance');
        Schema::dropIfExists('option_master');
        Schema::dropIfExists('co_encadrant');
        Schema::dropIfExists('examinateur');
        Schema::dropIfExists('choix_pfe');
        Schema::dropIfExists('choix_jury_pfe');
        Schema::dropIfExists('presidant');
        Schema::dropIfExists('theme_pfe');
        Schema::dropIfExists('email_pfe_template');
        

        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
