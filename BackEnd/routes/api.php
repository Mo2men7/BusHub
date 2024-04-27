<?php

use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/register", [UserController::class, "register"]);
Route::get("/trip", [UserController::class, "previous"])->middleware("auth:sanctum");
Route::get("/nexttrips", [UserController::class, "next"])->middleware("auth:sanctum");


Route::put("/edit", [UserController::class, "update"])->middleware("auth:sanctum");


Route::post("/login", [UserController::class, "login"]);
Route::get("/profile", [UserController::class, "profile"])->middleware("auth:sanctum");

Route::post("/logout", [UserController::class, "logout"])->middleware("auth:sanctum");
Route::group(['middleware' => ['auth:sanctum']], function () {
});
