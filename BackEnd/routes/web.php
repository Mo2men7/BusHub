<?php

use App\Http\Controllers\api\GoogleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get("/", "App\Http\Controllers\StripeController@index")->name('index');
Route::post("/checkout", "App\Http\Controllers\StripeController@checkout")->name('checkout');
Route::get("/success", "App\Http\Controllers\StripeController@success")->name('success');

// Route::get("auth/google", [GoogleController::class, "googlepage"])->name('google');
// Route::get("auth/google/callback", [GoogleController::class, "googlecallback"]);

// Route::get('/', function () {
//     return view('welcome');
// });
