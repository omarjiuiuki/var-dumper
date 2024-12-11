<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; 
use App\Models\Email;
class EmailController extends Controller
{
   



    public function getEmailTemplate() {
        $emailTemplates = DB::table('email_pfe_template')->get();
        return response()->json($emailTemplates);
    }


    public function ajouterEmail(Request $request)
    {
        $validatedData = $request->validate([
            'type_email' => 'required|string|max:255',
            'contenue' => 'required|string|max:255',
        
        ]);

  

       
        $emailTemplate = Email::create([
            'type_email' => $validatedData['type_email'],
            'contenue' => $validatedData['contenue'],
        ]);



        return response()->json(['message' => 'email created successfully', 'email' => $emailTemplate], 201);
    }




    public function modifierEmail(Request $request)
    {
        $validatedData = $request->validate([
             'id' => 'required|integer|exists:email_pfe_template,id',
            'contenue' => 'required|string|max:255',
         ]);

         $updatedTemplate = Email::where('id', $validatedData['id'])
                         ->update(['contenue' => $validatedData['contenue']]); 
    
                         if ($updatedTemplate) {
         return response()->json(['message' => 'Champ mis à jour avec succès'], 200);
       }
     
        return response()->json(['error' => 'Impossible de mettre à jour le contenue de l\'email'],500);
    }



    
 
    
}
