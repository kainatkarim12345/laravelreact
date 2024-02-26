<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::post('/register', [RegisteredUserController::class, 'store'])
//                 ->middleware('guest')
//                 ->name('register');


Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('/user', function (Request $request) { return $request->user(); });
    Route::get('/addsurvey', function (Request $request) { $data = [
        'message' => 'kkkkkkkkkkkkkkkk',
        'status' => 'success',
        // Any other data you want to include
    ];

    // JSON response with HTTP status code 200 (OK)
    return response()->json($data, 200); });
});
Route::get('/addsurvey', function (Request $request) { dd('kkkkkkkkkk'); });


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
