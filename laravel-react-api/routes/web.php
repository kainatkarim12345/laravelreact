<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\AdminController;
use App\Models\{User,Role,Permission};

// Route::get('/', function(){
//     $admin = User::whereName('Ali')->with('roles')->first();
//     // $admin_role = Role::whereName('Administration')->first();
//     // $admin->roles()->attach($admin_role);
//     // if($admin->hasRole('Administration')){
//     //     dd('yes user has admin role');
//     // }
//     // dd($admin->toArray());

//     // $user_permission = Permission::where('name', 'view_user')->first(); added permission
//     // $admin_role = Role::whereName('Administration')->with('permissions')->first(); 
    
//     // $admin_role->permissions();
//     // dd($admin_role->toArray());

//     // $users = User::with('roles.permissions')->get();
//     $users = User::with('roles.permissions')->get();
//     // dd($users[0]->roles->toArray()); specific user info with roles permisions
// });

Route::middleware(['auth:sanctum'])->group(function(){

    Route::get('/getroles', [AdminController::class, 'roles'])->name('getroles');
    Route::get('/getemployees', [AdminController::class, 'employees'])->name('getemployees');
    Route::get('/getpermissions', [AdminController::class, 'permissions'])->name('getpermissions');
    Route::post('/addrole', [AdminController::class, 'addRole'])->name('addrole');
    Route::get('/roledetail', [AdminController::class, 'roledetail'])->name('roledetail');
    Route::get('/employeedetail', [AdminController::class, 'employeeDetail'])->name('employeedetail');
    Route::post('/roleedit', [AdminController::class, 'roleEdit'])->name('roleedit');
    Route::post('/deleterole', [AdminController::class, 'roleDelete'])->name('deleterole');
    
    Route::post('/addemployee', [AdminController::class, 'addEmployee'])->name('addemployee');
    Route::post('/employeestatuschange', [AdminController::class, 'employeeStatusChange'])->name('employeestatuschange');
    

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
