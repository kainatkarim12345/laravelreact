<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;


// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });




        

Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('/user', function (Request $request) { return $request->user(); });
    Route::get('/addsurvey', function (Request $request) { dd('kkkkkkkkkk'); });
});
Route::get('/addsurvey', function (Request $request) { dd('kkkkkkkkkk'); });


