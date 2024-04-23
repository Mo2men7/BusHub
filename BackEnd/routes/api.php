<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BusController;
use App\Http\Resources\BusResource;
use App\Models\Bus;

use App\Http\Controllers\TripController;
use App\Http\Resources\TripResource;
use App\Models\Trip;

use App\Http\Controllers\DestinationController;
use App\Http\Resources\DestinationResource;
use App\Models\Destination;

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

Route::get('/buses', function () {
    return  BusResource::collection(Bus::all());
});
Route::get('/bus/{id}', function($id){
    return new BusResource(Bus::findOrFail($id));
});

Route::post('/buses',[BusController::class,'store']);
Route::put('/bus/{id}',[BusController::class,'update']);
Route::delete('/bus/{id}',[BusController::class,'destroy']);
// !end Bus
// !Destination
// ? to get all destinations in DB
Route::get('/destinations', function () {
    return  DestinationResource::collection(Destination::all());
});
// ? to get a single destination with $id in DB
Route::get('/destination/{id}', function($id){
    return new DestinationResource(Destination::findOrFail($id));
});
// ? to add a single destination in DB
Route::post('/destinations',[DestinationController::class,'store']);
// ? to update a single destination with $id in DB
Route::put('/destination/{id}',[DestinationController::class,'update']);
// ? to delete a single destination with $id in DB
Route::delete('/destination/{id}',[DestinationController::class,'destroy']);
// !end Destination

// !Trip

Route::get('/trips', function () {
    return  TripResource::collection(Trip::all());
});
Route::get('/trip/{id}', function($id){
    return new TripResource(Trip::findOrFail($id));
});

Route::post('/trips',[TripController::class,'store']);
Route::put('/trip/{id}',[TripController::class,'update']);
Route::delete('/trip/{id}',[TripController::class,'destroy']);
// !end trip


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
