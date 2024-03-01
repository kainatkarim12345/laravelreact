<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SurveyController;

Route::middleware(['auth:sanctum'])->group(function(){
    
    Route::post('/questionform', [QuestionController::class, 'store'])->name('questionform');
    Route::get('/getquestions', [QuestionController::class, 'getQuestions'])->name('getquestions');
    Route::post('/addsurvey', [SurveyController::class, 'store'])->name('addsurvey');
    Route::get('/getsurveys', [SurveyController::class, 'getSurveysData'])->name('getsurveys');
    Route::get('/surveydetail', [SurveyController::class, 'surveydetail'])->name('surveydetail');

});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
