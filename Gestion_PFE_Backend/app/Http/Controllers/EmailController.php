<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Email;
class EmailController extends Controller
{
   


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



    
    public function getEmailTemplate() {
        $emailTemplates = Email::select('type_email', 'contenue')->get();
        return response()->json($emailTemplates);
    }
 
    
}
