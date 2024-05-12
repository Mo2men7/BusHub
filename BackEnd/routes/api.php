<?php
//**********trips start************
use App\Models\Models1\Trip1;
use App\Http\Controllers\Controllers1\Trip1Controller;
use App\http\Resources\Resources1\Trip1Resourse;
//******trips end******
//*****seats start*****
use App\Models\Models1\Seat;
use App\Http\Controllers\Controllers1\Seat1Controller;
use App\Http\Resources\Resources1\SeatResourse;
//*****seats end*****

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
use App\Http\Controllers\ContactusController;
use App\Http\Controllers\Controllers1\SeatController;
use App\Http\Resources\admin\DestinationAdminResource;
use App\Models\admin\Destination;

use App\Http\Controllers\PrivateBusFromController;
use App\Http\Controllers\DestinationController;
use App\Http\Resources\DestinationResource;
use App\Models\Destintaion;

use App\Http\Controllers\TypeController;
// use Symfony\Component\HttpFoundation\Request;
use Illuminate\Support\Arr;
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
// **********trips start************

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
//**********trips end************
//**********seats start************
Route::get('/seat/{id}', function ($id) {
    return new SeatResourse(Seat::findOrFail($id));
});
Route::get('/seats', function () {
    return SeatResourse::collection(Seat::all());
});
Route::put('/seat/{id}', [Seat1Controller::class, 'update']);
Route::delete('/seat/{id}', [Seat1Controller::class, 'destroy']);
Route::post('/seats', [Seat1Controller::class, 'store']);

//**********seats end************

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
Route::get('/admin/destinations', [DestinationAdminController::class, 'index'])->middleware("auth:sanctum")->middleware("isAdmin");
// ? to get a single destination with $id in DB
Route::get('/admin/destination/{id}', function ($id) {
    return new DestinationAdminResource(Destination::findOrFail($id));
});
// ? to add a single destination in DB
Route::post('/admin/destinations', [DestinationAdminController::class, 'store']);

Route::get('/admin/images/pic/{filename}', function ($filename) {
    $file = \Illuminate\Support\Facades\Storage::get("/pic/" . $filename);

    return response($file, 200)->header('Content-Type', 'image/jpeg');
});
Route::get('/admin/images/flag/{filename}', function ($filename) {
    $file = \Illuminate\Support\Facades\Storage::get("/flag/" . $filename);

    return response($file, 200)->header('Content-Type', 'image/jpeg');
});
// ? to update a single destination with $id in DB
Route::post('/admin/destination-update/{id}', [DestinationAdminController::class, 'update']);
// ? to delete a single destination with $id in DB
Route::delete('/admin/destination/{id}', [DestinationAdminController::class, 'destroy']);
// !end Destination

// !Trip

Route::get('/admin/trips', [TripAdminController::class, 'index']);
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
Route::post("/contactus", [ContactusController::class, "contactus"])->middleware("auth:sanctum");
///////////////////////////ContactUs index, show, destroy and update////////////////////////////////
Route::get("/contactus", [ContactusController::class, "index"]);
Route::get("/contactus/{id}", [ContactusController::class, "show"]);
Route::delete("/contactus/{id}", [ContactusController::class, "destroy"]);
Route::put("/contactus/{id}", [ContactusController::class, "update"]);


// Route::get("auth/google/callback", [GoogleController::class, "googlecallback"]);

Route::post("/login", [UserController::class, "login"]);
Route::get("/profile", [UserController::class, "profile"])->middleware("auth:sanctum");

Route::get("/logout", [UserController::class, "logout"])->middleware("auth:sanctum");
Route::group(['middleware' => ['auth:sanctum']], function () {
});
///////////////////////////Destination Page and Section////////////////////////////////
Route::get('/destination/{id}', function ($id) {
    return new DestinationResource(Destintaion::findOrFail($id));
});
Route::get('destinations', function () {
    return DestinationResource::collection(Destintaion::all());
});
Route::put('/destination/{id}', [DestinationController::class, 'update']);
Route::delete('/destination/{id}', [DestinationController::class, 'destroy']);
Route::post('/destinations', [DestinationController::class, 'store']);
///////////////////////////PrivateBus Form Page and Admin Table////////////////////////////////
Route::get("/private-bus-requests", [PrivateBusFromController::class, 'index']);
Route::post('/private-bus', [PrivateBusFromController::class, 'store'])->middleware("auth:sanctum");
Route::get('private-bus-requests/{id}', [PrivateBusFromController::class, 'show']);
Route::put('private-bus-requests/{id}', [PrivateBusFromController::class, 'update']);
Route::put('private-bus-requests/{id}/accept', [PrivateBusFromController::class, 'acceptRequest']);
Route::put('private-bus-requests/{id}/decline', [PrivateBusFromController::class, 'declineRequest']);
Route::delete('private-bus-requests/{id}', [PrivateBusFromController::class, 'destroy']);
///////////////////////////BusTypes Inputs////////////////////////////////
Route::get("/bus-types", [TypeController::class, "index"]);


Route::get("payment", function (Request $request) {
    $valuue = $request->all();
    // $valuue=implode("=",$valuue);
    // echo url("http://localhost:4200/ticket/{$valuue}");

    $query = Arr::query($request->all());
    // foreach($request->query as $key=>$value)
    // {
    //     dd($value);
    // }
    // return response($request->query, 200)
    //   ->header('Content-Type', 'text/plain');
    return redirect()->intended("http://localhost:4200/ticket/?" . $query);
});


///////////////////////////Notifications Admin////////////////////////////////
use App\Http\Controllers\NotificationController;

Route::get('/adminNotifications', [NotificationController::class, 'adminNotifications']);
Route::get('/userNotifications', [NotificationController::class, 'userNotifications'])->middleware("auth:sanctum");
Route::put('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);
