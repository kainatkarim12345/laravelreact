<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\SurveyController;

Route::middleware(['auth:sanctum'])->group(function(){
    
    Route::post('/questionform', [SurveyController::class, 'store'])
             ->name('questionform');

});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
