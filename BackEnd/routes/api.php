<?php
//**trips show**start
use App\Models\Models1\Trip1;
use App\Http\Controllers\Controllers1\Trip1Controller;
use App\http\Resources\Resources1\Trip1Resourse;
//**trips show**end


use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\admin\BusAdminController;
use App\Http\Resources\admin\BusAdminResource;
use App\Models\admin\Bus;

use App\Http\Controllers\admin\TripAdminController;
use App\Http\Resources\admin\TripAdminResource;
use App\Models\admin\Trip;

use App\Http\Controllers\admin\DestinationAdminController;
use App\Http\Controllers\api\GoogleController;
use App\Http\Controllers\Auth\ForgetPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Resources\admin\DestinationAdminResource;
use App\Models\admin\Destination;

use App\Http\Controllers\PrivateBusFromController;
use App\Http\Controllers\DestinationController;
use App\Http\Resources\DestinationResource;
use App\Models\Destintaion;

use App\Http\Controllers\TypeController;

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
//**trips show**start
Route::get('/trip/{id}', function ($id) {
    return new Trip1Resourse(Trip1::findOrFail($id));
});
Route::get('/trips', function () {
    return Trip1Resourse::collection(Trip1::all());
});
Route::put('/trip/{id}', [Trip1Controller::class, 'update']);
Route::delete('/trip/{id}', [Trip1Controller::class, 'destroy']);
Route::post('/trips', [Trip1Controller::class, 'store']);
Route::get('/tripsjoin', [Trip1Controller::class, 'tripsjoin']);
//**trips show**end

// !Bus

Route::get('/admin/buses', [BusAdminController::class, 'index']);
Route::get('/admin/bus/{id}', function ($id) {
    return new BusAdminResource(Bus::findOrFail($id));
});

Route::post('/admin/buses', [BusAdminController::class, 'store']);
Route::put('/admin/bus/{id}', [BusAdminController::class, 'update']);
Route::delete('/admin/bus/{id}', [BusAdminController::class, 'destroy']);
// !end Bus
// !Destination
// ? to get all destinations in DB
Route::get('/admin/destinations', function () {
    return  DestinationAdminResource::collection(Destination::all());
});
// ? to get a single destination with $id in DB
Route::get('/admin/destination/{id}', function ($id) {
    return new DestinationAdminResource(Destination::findOrFail($id));
});
// ? to add a single destination in DB
Route::post('/admin/destinations', [DestinationAdminController::class, 'store']);
// ? to update a single destination with $id in DB
Route::put('/admin/destination/{id}', [DestinationAdminController::class, 'update']);
// ? to delete a single destination with $id in DB
Route::delete('/admin/destination/{id}', [DestinationAdminController::class, 'destroy']);
// !end Destination

// !Trip

Route::get('/admin/trips', function () {
    return  TripAdminResource::collection(Trip::all());
});
Route::get('/admin/trip/{id}', function ($id) {
    return new TripAdminResource(Trip::findOrFail($id));
});

Route::post('/admin/trips', [TripAdminController::class, 'store']);
Route::put('/admin/trip/{id}', [TripAdminController::class, 'update']);
Route::delete('/admin/trip/{id}', [TripAdminController::class, 'destroy']);
// !end trip


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post("/sign-google", [GoogleController::class, "signin"]);
Route::post("/register", [UserController::class, "register"]);
Route::get("/trip", [UserController::class, "previous"])->middleware("auth:sanctum");
Route::get("/nexttrips", [UserController::class, "next"])->middleware("auth:sanctum");


Route::put("/edit", [UserController::class, "update"])->middleware("auth:sanctum");
Route::post("/forgot-password", [ForgetPasswordController::class, "forgotPassword"]);
Route::post("/reset-password", [ResetPasswordController::class, "passwordReset"]);
Route::post("/verify-reset-code", [ResetPasswordController::class, "verifycode"]);



// Route::get("auth/google/callback", [GoogleController::class, "googlecallback"]);

Route::post("/login", [UserController::class, "login"]);
Route::get("/profile", [UserController::class, "profile"])->middleware("auth:sanctum");

Route::post("/logout", [UserController::class, "logout"])->middleware("auth:sanctum");
Route::group(['middleware' => ['auth:sanctum']], function () {
});
///////////////////////////Destination Page and Section////////////////////////////////
Route::get('/destination/{id}', function ($id) {
    return new DestinationResource(Destintaion::findOrFail($id));
});
Route::get('/destinations', function () {
    return DestinationResource::collection(Destintaion::all());
});
Route::put('/destination/{id}', [DestinationController::class, 'update']);
Route::delete('/destination/{id}', [DestinationController::class, 'destroy']);
Route::post('/destinations', [DestinationController::class, 'store']);
///////////////////////////PrivateBus Form Page and Admin Table////////////////////////////////
Route::get("/private-bus-requests", [PrivateBusFromController::class, 'index']);
Route::post('/private-bus', [PrivateBusFromController::class, 'store']);
Route::get('private-bus-requests/{id}', [PrivateBusFromController::class, 'show']);
Route::put('private-bus-requests/{id}', [PrivateBusFromController::class, 'update']);
Route::put('private-bus-requests/{id}/accept', [PrivateBusFromController::class, 'acceptRequest']);
Route::put('private-bus-requests/{id}/decline', [PrivateBusFromController::class, 'declineRequest']);
Route::delete('private-bus-requests/{id}', [PrivateBusFromController::class, 'destroy']);
///////////////////////////BusTypes Inputs////////////////////////////////
Route::get("/bus-types", [TypeController::class, "index"]);
