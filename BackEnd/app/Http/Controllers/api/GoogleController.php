<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Exception;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Laravel\Sanctum\PersonalAccessToken;


class GoogleController extends Controller
{

    public function signin(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {

            try {
                $request->validate([
                    "email" => ["required", "email"],
                    "username" => ["required"]
                ]);
                $user = User::create([
                    'email' => $request->email,
                    'username' => $request->username,
                    'password' => bcrypt('123456momo'),
                    "phone" => "",
                ]);
                $token = $user->createToken("usertoken")->plainTextToken;

                return response()->json([
                    "user" => $user,
                    'token' => $token
                ], 201);
            } catch (\Exception $e) {
                // If an error occurs during user creation, return an error response
                return response()->json([
                    'message' => 'User registration failed. Please try again later.'
                ], 500);
            }
        } elseif ($user) {

            try {
                $request->validate([
                    "email" => ["required", "email", "exists:users"],

                ]);


                $token = $user->createToken("usertoken")->plainTextToken;

                $response = [
                    "user" => $user,
                    'token' => $token
                ];

                return response()->json([
                    "user" => $user,
                    'token' => $token
                ], 201);
            } catch (\Exception $e) {
                // If an error occurs during user creation, return an error response
                return response()->json([
                    'message' => 'User registration failed. Please try again later.'
                ], 500);
            }
        }
    }
}
