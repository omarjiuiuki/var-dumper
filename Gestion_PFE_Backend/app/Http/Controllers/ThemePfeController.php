<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; 
use App\Models\ThemePfe;
class ThemePfeController extends Controller
{
    public function afficherThemePfe()
    {
        $theme = DB::table('theme_pfe')->get();
        return response()->json($theme);
       }


       public function ajouterTheme(Request $request)
        {
            $validatedData = $request->validate([
            
              'intitule_pfe'=> 'required|string|max:255',
              'type_pfe'=> 'required|string|max:255',
              'description'=> 'required|string|max:255',
              'option'=> 'required|string|max:255',
            ]);
    
            $theme = ThemePfe::create([
                'intitule_pfe' => $validatedData['intitule_pfe'],
                'type_pfe' => $validatedData['type_pfe'],
                'description' => $validatedData['description'],
                'option' => $validatedData['option'],
            ]);
    
           return response()->json(['message' => 'theme created successfully', 'theme' => $theme], 201);
         }


       
       
         public function validationTheme(Request $request)
         {
             // Valider les données entrantes
        $validated = $request->validate([
            'id' => 'required|integer|exists:theme_pfe,id', // Assurez-vous que l'ID existe dans votre table
            'est_valider' => 'required|string|max:255', // Adaptez selon vos besoins
        ]);

        // Mettre à jour directement avec la méthode `update`
        $updated = ThemePfe::where('id', $validated['id'])
            ->update(['est_valider' => $validated['est_valider']]); // Remplacez par le nom de votre colonne

        if ($updated) {
            return response()->json(['message' => 'Champ mis à jour avec succès'], 200);
        }

        return response()->json(['error' => 'Impossible de mettre à jour'], 500);
          }


          

          public function refueTheme(Request $request)
          {
              // Valider les données entrantes
         $validated = $request->validate([
             'id' => 'required|integer|exists:theme_pfe,id', // Assurez-vous que l'ID existe dans votre table
             'est_valider' => 'required|string|max:255', 
             'motif' => 'required|string|max:255'
         ]);
 
         // Mettre à jour directement avec la méthode `update`
         $updated = ThemePfe::where('id', $validated['id'])
         ->update([
            'est_valider' => $validated['est_valider'],
            'motif_refue' => $validated['motif']
        ]);
         if ($updated) {
             return response()->json(['message' => 'Champ mis à jour avec succès'], 200);
         }
 
         return response()->json(['error' => 'Impossible de mettre à jour'], 500);
           }



           public function store(Request $request)
           {
               $validatedData = $request->validate([
                   'intitule_pfe' => 'required|string|max:255',
                   'type_pfe' => 'required|string|max:50',
                   'description' => 'required|string',
                   'option' => 'required|string|max:50',
                   //'note' => 'nullable|string|max:10',
                   //'date_soutenance' => 'required|date',
                   'etudiant_1_id' => 'required|exists:etudiant,id',
                   'etudiant_2_id' => 'nullable|exists:etudiant,id', // Pour binôme facultatif
               ]);
           
               // Insérer dans la table theme_pfe
               $themePfe = \App\Models\ThemePfe::create($validatedData);
           
               return response()->json([
                   'message' => 'Projet enregistré avec succès.',
                   'theme_pfe' => $themePfe,
               ], 201);
           }
           


}