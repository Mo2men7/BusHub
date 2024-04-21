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
// !Bus

Route::get('/admin/buses', function () {
    return  BusAdminResource::collection(Bus::all());
});
Route::get('/admin/bus/{id}', function($id){
    return new BusAdminResource(Bus::findOrFail($id));
});

Route::post('/admin/buses',[BusAdminController::class,'store']);
Route::put('/admin/bus/{id}',[BusAdminController::class,'update']);
Route::delete('/admin/bus/{id}',[BusAdminController::class,'destroy']);
// !end Bus
// !Destination
// ? to get all destinations in DB
Route::get('/admin/destinations', function () {
    return  DestinationAdminResource::collection(Destination::all());
});
// ? to get a single destination with $id in DB
Route::get('/admin/destination/{id}', function($id){
    return new DestinationAdminResource(Destination::findOrFail($id));
});
// ? to add a single destination in DB
Route::post('/admin/destinations',[DestinationAdminController::class,'store']);
// ? to update a single destination with $id in DB
Route::put('/admin/destination/{id}',[DestinationAdminController::class,'update']);
// ? to delete a single destination with $id in DB
Route::delete('/admin/destination/{id}',[DestinationAdminController::class,'destroy']);
// !end Destination

// !Trip

Route::get('/admin/trips', function () {
    return  TripAdminResource::collection(Trip::all());
});
Route::get('/admin/trip/{id}', function($id){
    return new TripAdminResource(Trip::findOrFail($id));
});

Route::post('/admin/trips',[TripAdminController::class,'store']);
Route::put('/admin/trip/{id}',[TripAdminController::class,'update']);
Route::delete('/admin/trip/{id}',[TripAdminController::class,'destroy']);
// !end trip


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