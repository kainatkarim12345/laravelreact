<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;


Route::middleware(['auth:sanctum', 'role'])->group(function(){
    Route::get('/user', function (Request $request) { return $request->user(); });
    
});



