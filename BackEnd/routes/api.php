<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// trip table
use App\Models\Models1\Trip1;
use App\Http\Controllers\Controllers1\Trip1Controller;
use App\http\Resources\Resources1\Trip1Resourse;
// types table
use App\Models\Models1\Type1;
use App\Http\Controllers\Controllers1\Type1Controller;
use App\http\Resources\Resources1\Type1Resourse;
// Destination table
use App\Models\Models1\Destination1;
use App\Http\Controllers\Controllers1\Destination1Controller;
use App\http\Resources\Resources1\Destination1Resourse;


use function Laravel\Prompts\table;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// trip table
Route::get('/trip/{id}', function ($id) {return new Trip1Resourse(Trip1::findOrFail($id));});
Route::get('/trips', function () {return Trip1Resourse ::collection(Trip1::all());});
Route::put('/trip/{id}',[Trip1Controller::class,'update']);
Route::delete('/trip/{id}',[Trip1Controller::class,'destroy']);
Route::post('/trips',[Trip1Controller::class,'store']);
Route::get('/tripsjoin',[Trip1Controller::class,'tripsjoin']);

// types table
Route::get('/type/{id}', function ($id) {return new Type1Resourse(Type1::findOrFail($id));});
Route::get('/types', function () {return Type1Resourse ::collection(Type1::all());});
Route::put('/type/{id}',[Type1Controller::class,'update']);
Route::delete('/type/{id}',[Type1Controller::class,'destroy']);
Route::post('/types',[Type1Controller::class,'store']);

// Destination table
Route::get('/destination/{id}', function ($id) {return new Destination1Resourse(Destination1::findOrFail($id));});
Route::get('/destinations', function () {return Destination1Resourse ::collection(Destination1::all());});
Route::put('/destination/{id}',[Destination1Controller::class,'update']);
Route::delete('/destination/{id}',[Destination1Controller::class,'destroy']);
Route::post('/destinations',[Destination1Controller::class,'store']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
