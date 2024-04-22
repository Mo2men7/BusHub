<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// trip table
use App\Models\Trip;
use App\Http\Controllers\TripController;
use App\http\Resources\TripResourse;
// types table
use App\Models\Type;
use App\Http\Controllers\TypeController;
use App\http\Resources\TypeResourse;
// Destination table
use App\Models\Destination;
use App\Http\Controllers\DestinationController;
use App\http\Resources\DestinationResourse;


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
Route::get('/trip/{id}', function ($id) {return new TripResourse(Trip::findOrFail($id));});
Route::get('/trips', function () {return TripResourse ::collection(Trip::all());});
Route::put('/trip/{id}',[TripController::class,'update']);
Route::delete('/trip/{id}',[TripController::class,'destroy']);
Route::post('/trips',[TripController::class,'store']);
Route::get('/tripsjoin',[TripController::class,'tripsjoin']);

// types table
Route::get('/type/{id}', function ($id) {return new TypeResourse(Type::findOrFail($id));});
Route::get('/types', function () {return TypeResourse ::collection(Type::all());});
Route::put('/type/{id}',[TypeController::class,'update']);
Route::delete('/type/{id}',[TypeController::class,'destroy']);
Route::post('/types',[TypeController::class,'store']);

// Destination table
Route::get('/destination/{id}', function ($id) {return new DestinationResourse(Destination::findOrFail($id));});
Route::get('/destinations', function () {return DestinationResourse ::collection(Destination::all());});
Route::put('/destination/{id}',[DestinationController::class,'update']);
Route::delete('/destination/{id}',[DestinationController::class,'destroy']);
Route::post('/destinations',[DestinationController::class,'store']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
