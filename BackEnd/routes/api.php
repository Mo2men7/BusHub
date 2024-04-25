<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// trip table
use App\Models\Models1\Trip;
use App\Http\Controllers\Controllers1\Trip1Controller;
use App\http\Resources\Resources1\Trip1Resourse;
// types table
use App\Models\Models1\Type;
use App\Http\Controllers\Controllers1\Type1Controller;
use App\http\Resources\Resources1\Type1Resourse;
// Destination table
use App\Models\Models1\Destination;
use App\Http\Controllers\Controllers1\Destination1Controller;
use App\http\Resources\Resources1\Destination1Resourse;


use function Laravel\Prompts\table;

use App\Http\Controllers\admin\BusAdminController;
use App\Http\Resources\admin\BusAdminResource;
use App\Models\admin\Bus;

use App\Http\Controllers\admin\TripAdminController;
use App\Http\Resources\admin\TripAdminResource;
use App\Models\admin\Trip;

use App\Http\Controllers\admin\DestinationAdminController;
use App\Http\Resources\admin\DestinationAdminResource;
use App\Models\admin\Destination;

use App\Http\Controllers\PrivateBusFromController;
use App\Http\Controllers\DestinationController;
use App\Http\Resources\DestinationResource;
use App\Models\Destintaion;

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
Route::get('/trip/{id}', function ($id) {return new Trip1Resourse(Trip::findOrFail($id));});
Route::get('/trips', function () {return Trip1Resourse ::collection(Trip::all());});
Route::put('/trip/{id}',[Trip1Controller::class,'update']);
Route::delete('/trip/{id}',[Trip1Controller::class,'destroy']);
Route::post('/trips',[Trip1Controller::class,'store']);
Route::get('/tripsjoin',[Trip1Controller::class,'tripsjoin']);

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


Route::get('/destination/{id}', function($id){
    return new DestinationResource(Destintaion::findOrFail($id));
});
Route::get('/destinations', function(){
    return DestinationResource::collection(Destintaion::all());
});
Route::put('/destination/{id}', [DestinationController::class, 'update']);
Route::delete('/destination/{id}', [DestinationController::class, 'destroy']);
Route::post('/destinations', [DestinationController::class, 'store']);

///////////////////////////////////////////////////////////

Route::post('/private-bus', [ PrivateBusFromController::class, 'store']);

///////////////////////////////////////////////////////////