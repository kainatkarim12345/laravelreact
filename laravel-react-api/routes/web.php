<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\AdminController;

Route::middleware(['auth:sanctum'])->group(function(){

    Route::get('/getroles', [AdminController::class, 'roles'])->name('getroles');
    Route::get('/getpermissions', [AdminController::class, 'permissions'])->name('getpermissions');
    Route::post('/addrole', [AdminController::class, 'addRole'])->name('addrole');
    Route::get('/roledetail', [AdminController::class, 'roledetail'])->name('roledetail');
    Route::post('/roleedit', [AdminController::class, 'roleEdit'])->name('roleedit');
    Route::post('/deleterole', [AdminController::class, 'roleDelete'])->name('deleterole');
    

    Route::post('/questionform', [QuestionController::class, 'store'])->name('questionform');
    Route::post('/termsform', [SurveyController::class, 'addterms'])->name('termsform');
    Route::get('/getterms', [SurveyController::class, 'getTerms'])->name('getterms');
    Route::get('/getquestions', [QuestionController::class, 'getQuestions'])->name('getquestions');
    Route::post('/addsurvey', [SurveyController::class, 'store'])->name('addsurvey');
    Route::get('/getsurveys', [SurveyController::class, 'getSurveysData'])->name('getsurveys');
    Route::get('/surveydetail', [SurveyController::class, 'surveydetail'])->name('surveydetail');

});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
