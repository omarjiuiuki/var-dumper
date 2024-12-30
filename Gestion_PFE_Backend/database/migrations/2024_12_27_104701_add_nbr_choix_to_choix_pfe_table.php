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
        Schema::table('choix_pfe', function (Blueprint $table) {
            $table->integer('nbr_choix')->after('etudiant_2_id')->default(1);
        });
    }

    public function down()
    {
        Schema::table('choix_pfe', function (Blueprint $table) {
            $table->dropColumn('nbr_choix');
        });
    }

};
