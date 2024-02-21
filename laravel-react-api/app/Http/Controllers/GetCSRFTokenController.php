<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GetCSRFTokenController extends Controller
{
    
    public function getCsrfTOken(){

        $csrfToken = csrf_token();
        
           
        return response()->json(['csrf_token' => $csrfToken]);
        
    }
}
